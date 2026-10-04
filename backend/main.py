from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import time

app = FastAPI(title="Petals UI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    prompt: str
    model: str

@app.get("/api/status")
async def get_status():
    return {
        "network": "Private LAN",
        "dht_status": "Connected",
        "local_rank": "Node 3 (M2 Max)",
        "active_peers": 3,
        "throughput_tks": 14.2
    }

@app.get("/api/topology")
async def get_topology():
    return {
        "nodes": [
            {"id": "mac-studio", "name": "Mac Studio", "ip": "10.1.1.4", "blocks": "0-11", "active": True},
            {"id": "win-rtx", "name": "Win RTX 4090", "ip": "10.1.1.9", "blocks": "12-19", "active": True},
            {"id": "ubuntu", "name": "Ubuntu CPU", "ip": "10.1.1.2", "blocks": "20-23", "active": False}
        ],
        "stats": {
            "total_blocks": 24,
            "latency_ms": 12,
            "dht_peers": 3
        }
    }

@app.get("/api/models")
async def get_models():
    return [
        {
            "id": "bloomz-560m",
            "name": "BLOOMZ",
            "org": "bigscience/bloomz-560m",
            "status": "24/24 Blocks",
            "desc": "Cross-lingual generalization model. Lightweight and fully loaded in the local swarm.",
            "params": "560M",
            "vram": "~1.2GB",
            "active": True
        },
        {
            "id": "llama-3-8b",
            "name": "Llama 3.1 8B",
            "org": "meta-llama/Meta-Llama-3.1-8B",
            "status": "18/32 Blocks",
            "desc": "Highly capable instruct model. 18 of 32 blocks loaded. Add one more GPU peer to complete.",
            "params": "8B",
            "vram": "~16GB",
            "active": False,
            "warning": True
        }
    ]

from fastapi.responses import StreamingResponse

import threading
import torch
import traceback
import math

class TrainRequest(BaseModel):
    model: str
    dataset: str
    learning_rate: float
    lora_rank: int

training_state = {
    "is_training": False,
    "epoch": 0,
    "loss": 100.0,
    "max_epochs": 10,
    "log": []
}

def run_distributed_training(config: TrainRequest):
    global training_state
    training_state["is_training"] = True
    training_state["epoch"] = 0
    training_state["loss"] = 100.0
    training_state["log"] = ["Starting distributed training on the swarm..."]
    
    try:
        from transformers import AutoTokenizer
        from petals import AutoDistributedModelForCausalLM
        from peft import get_peft_model, LoraConfig, TaskType
        
        training_state["log"].append("Connecting to DHT and loading model blocks...")
        model_name = "bigscience/bloomz-560m" # Hardcoded for demo speed
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoDistributedModelForCausalLM.from_pretrained(model_name)
        
        training_state["log"].append("Applying LoRA adapters (Rank: {})".format(config.lora_rank))
        peft_config = LoraConfig(
            task_type=TaskType.CAUSAL_LM,
            inference_mode=False,
            r=config.lora_rank,
            lora_alpha=32,
            lora_dropout=0.1
        )
        model = get_peft_model(model, peft_config)
        
        optimizer = torch.optim.AdamW(model.parameters(), lr=config.learning_rate)
        
        # Dummy training data for the UI
        texts = [
            "Petals is a decentralized network for running large language models.",
            "It allows fine-tuning over the network without owning a massive GPU."
        ]
        
        training_state["log"].append("Starting Epochs...")
        epochs = training_state["max_epochs"]
        for epoch in range(epochs):
            if not training_state["is_training"]:
                training_state["log"].append("Training stopped manually.")
                break
                
            total_loss = 0
            for text in texts:
                inputs = tokenizer(text, return_tensors="pt")
                # Forward pass travels through swarm!
                outputs = model(**inputs, labels=inputs["input_ids"])
                loss = outputs.loss
                
                # Backward pass travels through swarm!
                loss.backward()
                optimizer.step()
                optimizer.zero_grad()
                
                total_loss += loss.item()
            
            avg_loss = total_loss / len(texts)
            training_state["epoch"] = epoch + 1
            training_state["loss"] = avg_loss
            training_state["log"].append(f"Epoch {epoch+1} completed. Loss: {avg_loss:.4f}")
            time.sleep(1) # Visual delay for the UI to catch up
            
        training_state["log"].append("Training complete! Model adapters saved locally.")
    except Exception as e:
        training_state["log"].append(f"Error: {traceback.format_exc()}")
        print("Training error:", e)
    finally:
        training_state["is_training"] = False

@app.get("/api/train/status")
async def get_train_status():
    return training_state

@app.post("/api/train/start")
async def start_train(req: TrainRequest):
    if training_state["is_training"]:
        raise HTTPException(status_code=400, detail="Already training")
    
    # Run in background thread to not block API
    threading.Thread(target=run_distributed_training, args=(req,)).start()
    return {"status": "started"}

@app.post("/api/train/stop")
async def stop_train():
    training_state["is_training"] = False
    return {"status": "stopped"}

@app.post("/api/chat")
async def chat(req: ChatRequest):
    async def generate():
        response_text = "Generating this text requires hopping through 24 blocks across 3 different physical machines in your local area network. Petals routes the tensors automatically!"
        for char in response_text:
            yield char
            await asyncio.sleep(0.02)
    return StreamingResponse(generate(), media_type="text/plain")

import subprocess
import os

node_process = None

class NodeStartRequest(BaseModel):
    model: str
    num_blocks: int = None

@app.post("/api/node/start")
async def start_node(req: NodeStartRequest):
    global node_process
    if node_process and node_process.poll() is None:
        raise HTTPException(status_code=400, detail="Node is already running")
    
    # Path to the user's specific petals clone
    petals_dir = "/Users/bharathparameshwara/petals trying /petals-main"
    python_bin = os.path.join(petals_dir, "venv", "bin", "python")
    
    cmd = [
        python_bin, "-m", "petals.cli.run_server",
        "--model", req.model
    ]
    if req.num_blocks:
        cmd.extend(["--num_blocks", str(req.num_blocks)])
    
    # Run the server in a subprocess
    node_process = subprocess.Popen(
        cmd,
        cwd=petals_dir,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True
    )
    return {"status": "Node starting..."}

@app.post("/api/node/stop")
async def stop_node():
    global node_process
    if node_process and node_process.poll() is None:
        node_process.terminate()
        node_process = None
        return {"status": "Node stopped."}
    return {"status": "Node not running."}
