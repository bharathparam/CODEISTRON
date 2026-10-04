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

@app.post("/api/chat")
async def chat(req: ChatRequest):
    # This matches with the backend!
    # We will simulate a streaming response from the distributed network for now,
    # but in a real Petals deployment, you'd yield from model.generate()
    async def generate():
        response_text = "Generating this text requires hopping through 24 blocks across 3 different physical machines in your local area network. Petals routes the tensors automatically!"
        for char in response_text:
            yield char
            await asyncio.sleep(0.02)
    
    return StreamingResponse(generate(), media_type="text/plain")
