import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Network, Server, Cpu, Activity, MessageSquareText, Shield, ArrowRight, CheckCircle2, Zap, Database, TrendingDown, Library, Send } from 'lucide-react';

export default function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#050505] text-[#f0f0f0] font-sans selection:bg-[#ff79c6]/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,121,198,0.03)_0%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {!onboardingComplete ? (
          <OnboardingWizard key="onboarding" onComplete={() => setOnboardingComplete(true)} />
        ) : (
          <MainDashboard key="dashboard" />
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------
// ONBOARDING WIZARD (Cinematic Storytelling)
// ---------------------------------------------------------
function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(10px)" }}
      className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#050505]"
    >
      <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
        {/* Cinematic Canvas */}
        <AnimatePresence mode="wait">
          {step === 1 && <Step1_Bottleneck key="step1" />}
          {step === 2 && <Step2_TheSwarm key="step2" />}
          {step === 3 && <Step3_IntelligentDistribution key="step3" />}
          {step === 4 && <Step4_Ready key="step4" />}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-12 flex flex-col items-center gap-8 z-10">
        <div className="flex gap-3">
          {[1,2,3,4].map(i => (
            <div key={i} className={`w-12 h-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-[#ff79c6] shadow-[0_0_10px_#ff79c6]' : 'bg-[#1e1e2e]'}`} />
          ))}
        </div>
        
        <button 
          onClick={() => step < 4 ? setStep(s => s + 1) : onComplete()}
          className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full border border-[#ff79c6]/50 hover:border-[#ff79c6] transition-all"
        >
          <div className="absolute inset-0 bg-[#ff79c6]/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10 flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-[#ff79c6]">
            {step < 4 ? 'Continue' : 'Enter Petals'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </motion.div>
  );
}

function Step1_Bottleneck() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
      <motion.div 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-light mb-2">The AI Hardware Bottleneck</h2>
        <p className="text-[#888] font-mono text-sm">A 70B parameter model requires 140GB of VRAM.</p>
      </motion.div>

      <div className="relative flex flex-col items-center">
        {/* Giant Model Block */}
        <motion.div 
          animate={{ y: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 w-48 h-48 bg-gradient-to-br from-red-500/20 to-orange-500/5 border border-red-500/50 rounded-xl backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.2)]"
        >
          <span className="font-mono text-red-400 font-bold text-xl">Llama-3 70B</span>
        </motion.div>

        {/* User Laptop (Struggling) */}
        <motion.div 
          animate={{ x: [-2, 2, -2] }} transition={{ duration: 0.1, repeat: Infinity }}
          className="w-32 h-24 border-2 border-[#333] rounded-t-xl border-b-0 flex items-end justify-center relative bg-[#0a0a0a]"
        >
          <div className="w-16 h-8 bg-red-500/20 blur-xl absolute" />
          <span className="font-mono text-xs text-[#555] mb-2">16GB VRAM</span>
        </motion.div>
        <div className="w-40 h-2 bg-[#333] rounded-b-xl shadow-2xl" />
        
        {/* Error spark */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1, type: 'spring' }}
          className="absolute top-10 right-[-40px] bg-red-500 text-white text-[10px] font-mono px-2 py-1 rounded"
        >
          OOM Error
        </motion.div>
      </div>
    </motion.div>
  );
}

function Step2_TheSwarm() {
  const nodes = Array.from({ length: 12 }).map((_, i) => ({
    angle: (i * 360) / 12,
    radius: 180,
    delay: i * 0.1
  }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center relative w-full h-full">
      <motion.div className="absolute top-0 text-center">
        <h2 className="text-3xl font-light mb-2">Enter the Swarm</h2>
        <p className="text-[#888] font-mono text-sm">Connect to a global DHT network of consumer GPUs.</p>
      </motion.div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
            animate={{ 
              scale: 1, opacity: 1, 
              x: Math.cos(node.angle * (Math.PI / 180)) * node.radius,
              y: Math.sin(node.angle * (Math.PI / 180)) * node.radius,
            }}
            transition={{ delay: node.delay, type: 'spring', stiffness: 100 }}
            className="absolute w-10 h-10 bg-[#111] border border-[#ff79c6]/40 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,121,198,0.2)]"
          >
            <Server size={14} className="text-[#ff79c6]" />
          </motion.div>
        ))}

        {/* Central user node */}
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: 'spring' }}
          className="absolute w-16 h-16 bg-[#50fa7b]/10 border-2 border-[#50fa7b] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(80,250,123,0.3)] z-10"
        >
          <Activity className="text-[#50fa7b]" />
        </motion.div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full -z-10">
          <g transform="translate(448, 250)">
            {nodes.map((node, i) => (
              <motion.line
                key={`line-${i}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ delay: 1.5 + i * 0.05, duration: 0.5 }}
                x1={0} y1={0}
                x2={Math.cos(node.angle * (Math.PI / 180)) * node.radius}
                y2={Math.sin(node.angle * (Math.PI / 180)) * node.radius}
                stroke="#50fa7b" strokeWidth="1" strokeDasharray="4 4"
              />
            ))}
          </g>
        </svg>
      </div>
    </motion.div>
  );
}

function Step3_IntelligentDistribution() {
  const layers = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    endX: (Math.random() - 0.5) * 400,
    endY: (Math.random() - 0.5) * 250,
  }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center relative w-full h-full">
      <motion.div className="absolute top-0 text-center z-20">
        <h2 className="text-3xl font-light mb-2">Intelligent Distribution</h2>
        <p className="text-[#888] font-mono text-sm">Petals splits the model into blocks and loads them across peers.</p>
      </motion.div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute w-32 h-32 bg-gradient-to-br from-[#bd93f9]/50 to-[#ff79c6]/50 border border-[#bd93f9] rounded-xl flex items-center justify-center z-10"
        >
          <span className="font-mono text-white font-bold">Llama-3</span>
        </motion.div>

        {layers.map((layer, i) => (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{ x: layer.endX, y: layer.endY, opacity: 1, scale: 1 }}
            transition={{ delay: 1 + Math.random() * 1, type: "spring", stiffness: 50, damping: 10 }}
            className="absolute w-6 h-6 bg-[#111] border border-[#bd93f9] rounded flex items-center justify-center shadow-[0_0_10px_rgba(189,147,249,0.3)]"
          >
            <span className="text-[8px] font-mono text-[#bd93f9]">{i}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Step4_Ready() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-full">
      <motion.div 
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
        className="w-24 h-24 rounded-full bg-[#50fa7b]/20 border-2 border-[#50fa7b] flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(80,250,123,0.2)]"
      >
        <CheckCircle2 size={48} className="text-[#50fa7b]" />
      </motion.div>
      <h2 className="text-3xl font-light mb-4">Swarm Initialized</h2>
      <p className="text-[#888] font-mono text-sm max-w-md text-center">
        Your environment is ready. You are now hosting 12 blocks and connected to peers on your private LAN.
      </p>
    </motion.div>
  );
}


// ---------------------------------------------------------
// MAIN DASHBOARD UI (Connected to API)
// ---------------------------------------------------------
function MainDashboard() {
  const [activeTab, setActiveTab] = useState('topology');

  return (
    <motion.div 
      initial={{ opacity: 0, filter: "blur(10px)" }} 
      animate={{ opacity: 1, filter: "blur(0px)" }} 
      transition={{ duration: 1 }}
      className="flex w-full h-full"
    >
      {/* Sleek Minimalist Sidebar */}
      <div className="w-[80px] h-full border-r border-[#1e1e2e] bg-[#0a0a0a] flex flex-col items-center py-6 gap-8 z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff79c6] to-[#bd93f9] flex items-center justify-center shadow-[0_0_20px_rgba(255,121,198,0.4)]">
          <Activity className="text-white w-5 h-5" />
        </div>
        
        <nav className="flex flex-col gap-4 w-full px-3">
          <SidebarIcon icon={<Network />} id="topology" active={activeTab} set={setActiveTab} tooltip="Swarm Map" />
          <SidebarIcon icon={<MessageSquareText />} id="chat" active={activeTab} set={setActiveTab} tooltip="Inference Chat" />
          <SidebarIcon icon={<Cpu />} id="training" active={activeTab} set={setActiveTab} tooltip="Training Lab" />
          <SidebarIcon icon={<Library />} id="models" active={activeTab} set={setActiveTab} tooltip="Model Library" />
          <SidebarIcon icon={<Shield />} id="config" active={activeTab} set={setActiveTab} tooltip="Network Config" />
        </nav>
      </div>

      {/* Main Glassmorphism Canvas */}
      <div className="flex-1 h-full relative overflow-hidden bg-[#050505]">
        <Header />
        
        <div className="p-8 h-[calc(100vh-70px)]">
          <AnimatePresence mode="wait">
            {activeTab === 'topology' && <TopologyView key="topology" />}
            {activeTab === 'chat' && <InferenceChatView key="chat" />}
            {activeTab === 'training' && <TrainingView key="training" />}
            {activeTab === 'models' && <ModelsView key="models" />}
            {activeTab === 'config' && <ConfigView key="config" />}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function ConfigView() {
  const [nodeStatus, setNodeStatus] = useState("Not Running");

  const startNode = async () => {
    setNodeStatus("Starting Petals server in subprocess...");
    try {
      await fetch('/api/node/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'bigscience/bloomz-560m', num_blocks: 12 })
      });
      setNodeStatus("Running (Local Petals Node online)");
    } catch (e) {
      setNodeStatus("Error starting node");
    }
  };

  const stopNode = async () => {
    try {
      await fetch('/api/node/stop', { method: 'POST' });
      setNodeStatus("Not Running");
    } catch (e) {}
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="border border-[#1e1e2e] bg-[#0a0a0a]/80 p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold mb-2">Network Configuration</h2>
        <p className="text-[#888] font-mono text-sm mb-8">Manage your private Swarm connection and local node instances.</p>

        <div className="flex flex-col gap-6">
          <div className="bg-[#111] border border-[#1e1e2e] p-6 rounded-xl">
            <h3 className="text-lg font-mono mb-4 text-[#ff79c6]">Local Swarm Node</h3>
            <p className="text-sm text-[#888] mb-4">Spin up a local Petals server on your machine to host model blocks for the private LAN swarm. This uses your specific clone at <span className="text-[#50fa7b]">/petals-main</span>.</p>
            
            <div className="font-mono text-xs bg-[#050505] p-3 rounded mb-4 text-[#555]">
              Status: <span className={nodeStatus.includes("Running") ? "text-[#50fa7b]" : "text-[#ffb86c]"}>{nodeStatus}</span>
            </div>

            <div className="flex gap-4">
              <button onClick={startNode} className="flex-1 py-3 bg-[#50fa7b]/10 border border-[#50fa7b]/30 text-[#50fa7b] rounded-lg hover:bg-[#50fa7b]/20 transition-all font-mono text-sm">
                START LOCAL NODE
              </button>
              <button onClick={stopNode} className="flex-1 py-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500/20 transition-all font-mono text-sm">
                STOP NODE
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SidebarIcon({ icon, id, active, set, tooltip }: any) {
  const isActive = active === id;
  return (
    <div className="relative group w-full flex justify-center">
      <button 
        onClick={() => set(id)}
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative z-10 ${
          isActive ? 'bg-[#1e1e2e] text-[#ff79c6] shadow-[0_0_15px_rgba(255,121,198,0.15)]' : 'text-[#555] hover:text-[#fff] hover:bg-[#111]'
        }`}
      >
        {icon}
      </button>
      {/* Tooltip */}
      <div className="absolute left-[70px] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1e1e2e] text-[#fff] text-xs font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        {tooltip}
      </div>
    </div>
  );
}

function Header() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    fetch('/api/status').then(r => r.json()).then(data => setStatus(data)).catch(console.error);
  }, []);

  return (
    <header className="h-[70px] border-b border-[#1e1e2e] flex items-center justify-between px-8 bg-[#0a0a0a]/80 backdrop-blur-md z-10 relative">
      <h1 className="font-mono text-xl tracking-wider font-light text-[#f0f0f0]">
        PETALS <span className="text-[#ff79c6] font-bold">SWARM</span>
      </h1>
      
      <div className="flex items-center gap-6 font-mono text-xs text-[#888]">
        <div className="flex items-center gap-2 bg-[#111] px-3 py-1.5 rounded-full border border-[#1e1e2e]">
          <div className="w-2 h-2 rounded-full bg-[#50fa7b] shadow-[0_0_10px_#50fa7b] animate-pulse" />
          <span className="text-[#f0f0f0]">{status ? status.network : 'Connecting...'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Server size={14} className="text-[#bd93f9]" />
          <span>Nodes: <span className="text-[#f0f0f0]">{status ? status.active_peers : '-'}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-[#f1fa8c]" />
          <span>Speed: <span className="text-[#f0f0f0]">{status ? status.throughput_tks : '-'} tk/s</span></span>
        </div>
      </div>
    </header>
  );
}

// ---------------------------------------------------------
// TOPOLOGY VIEW (Animated Swarm Map from API)
// ---------------------------------------------------------
function TopologyView() {
  const [topology, setTopology] = useState<any>(null);

  useEffect(() => {
    fetch('/api/topology').then(r => r.json()).then(data => setTopology(data)).catch(console.error);
  }, []);

  // Calculate coordinates dynamically based on nodes length
  const radius = 200;
  
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="h-full flex flex-col gap-6">
      <div className="flex-1 rounded-2xl border border-[#1e1e2e] bg-[#0a0a0a]/50 relative overflow-hidden backdrop-blur-xl flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(189,147,249,0.05)_0%,transparent_70%)]" />
        
        <div className="relative w-[600px] h-[400px]">
          <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 8px rgba(255,121,198,0.2))' }}>
            <motion.ellipse 
              cx="300" cy="200" rx="250" ry="120" 
              fill="none" stroke="#1e1e2e" strokeWidth="2"
            />
            <motion.ellipse 
              initial={{ strokeDasharray: "0 1500" }}
              animate={{ strokeDasharray: "1500 0" }}
              transition={{ duration: 3, ease: "easeInOut" }}
              cx="300" cy="200" rx="250" ry="120" 
              fill="none" stroke="#ff79c6" strokeWidth="2" className="opacity-50"
            />
            
            <motion.circle r="4" fill="#50fa7b" filter="blur(2px)">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 550,200 A 250,120 0 1,1 50,200 A 250,120 0 1,1 550,200" />
            </motion.circle>
            <motion.circle r="4" fill="#bd93f9" filter="blur(2px)">
              <animateMotion dur="4s" begin="2s" repeatCount="indefinite" path="M 550,200 A 250,120 0 1,1 50,200 A 250,120 0 1,1 550,200" />
            </motion.circle>
          </svg>

          {topology?.nodes.map((n: any, i: number) => {
            const angle = (i / topology.nodes.length) * Math.PI * 2;
            const x = 300 + Math.cos(angle) * 250;
            const y = 200 + Math.sin(angle) * 120;
            return <SwarmNode key={n.id} x={x} y={y} name={n.name} ip={n.ip} blocks={n.blocks} active={n.active} />;
          })}
        </div>
      </div>
      
      <div className="h-[200px] grid grid-cols-3 gap-6">
        <StatCard title="Total Hosted Blocks" value={topology?.stats?.total_blocks || "-"} sub="Distributed" color="#50fa7b" />
        <StatCard title="Network Latency" value={topology ? `${topology.stats.latency_ms}ms` : "-"} sub="Average ping" color="#bd93f9" />
        <StatCard title="DHT Peers" value={topology?.stats?.dht_peers || "-"} sub="Healthy ring" color="#ff79c6" />
      </div>
    </motion.div>
  );
}

function SwarmNode({ x, y, name, ip, blocks, active }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.1 }}
      className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
      style={{ left: x, top: y }}
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center relative mb-3 ${active ? 'bg-[#ff79c6]/10 border-2 border-[#ff79c6]' : 'bg-[#1e1e2e] border-2 border-[#333]'}`}>
        {active && <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-[#ff79c6]" />}
        <Server className={active ? 'text-[#ff79c6]' : 'text-[#555]'} size={20} />
      </div>
      <div className="bg-[#050505]/90 border border-[#1e1e2e] px-3 py-2 rounded-lg text-center backdrop-blur-md shadow-xl">
        <div className="text-sm font-semibold text-[#f0f0f0]">{name}</div>
        <div className="font-mono text-[10px] text-[#888]">{ip}</div>
        <div className="mt-1 font-mono text-xs text-[#bd93f9] bg-[#bd93f9]/10 px-1 rounded">Blocks: {blocks}</div>
      </div>
    </motion.div>
  );
}

function StatCard({ title, value, sub, color }: any) {
  return (
    <div className="border border-[#1e1e2e] bg-[#0a0a0a]/50 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md group hover:border-[#333] transition-colors">
      <h3 className="font-mono text-xs text-[#888] uppercase tracking-wider">{title}</h3>
      <div>
        <div className="text-4xl font-light mb-1" style={{ color }}>{value}</div>
        <div className="font-mono text-xs text-[#555]">{sub}</div>
      </div>
    </div>
  );
}


// ---------------------------------------------------------
// INFERENCE CHAT VIEW (Connected to API streaming)
// ---------------------------------------------------------
function InferenceChatView() {
  const [messages, setMessages] = useState<any[]>([
    { role: 'system', text: 'Model loaded in swarm. Ready for inference.' }
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeBlocks, setActiveBlocks] = useState<number[]>([]);

  const handleSend = async () => {
    if(!input.trim()) return;
    const prompt = input;
    setInput('');
    setMessages(p => [...p, { role: 'user', text: prompt }]);
    setIsGenerating(true);
    setMessages(p => [...p, { role: 'ai', text: '', streaming: true }]);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model: 'bloomz-560m' })
      });
      
      if (!response.body) throw new Error("No body");
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      let blockInterval = setInterval(() => {
        setActiveBlocks([Math.floor(Math.random() * 24)]);
      }, 50);

      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        if(chunkValue) {
          setMessages(p => {
            const arr = [...p];
            arr[arr.length-1].text += chunkValue;
            return arr;
          });
        }
      }
      
      clearInterval(blockInterval);
      setActiveBlocks([]);
      setMessages(p => {
        const arr = [...p];
        arr[arr.length-1].streaming = false;
        return arr;
      });
      setIsGenerating(false);

    } catch (err) {
      console.error(err);
      setIsGenerating(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="h-full grid grid-cols-3 gap-6">
      
      <div className="col-span-2 flex flex-col gap-4">
        <div className="flex-1 border border-[#1e1e2e] bg-[#0a0a0a]/50 rounded-2xl p-6 overflow-y-auto flex flex-col gap-6 backdrop-blur-md">
          {messages.map((m, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              key={i}
              className={`max-w-[85%] p-4 rounded-xl text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'self-end bg-gradient-to-r from-[#ff79c6]/20 to-[#bd93f9]/20 border border-[#ff79c6]/30 text-[#f8f8f2] rounded-br-none' 
                  : m.role === 'system'
                  ? 'self-center bg-transparent text-[#6272a4] font-mono text-xs border border-[#1e1e2e] px-4 py-2 rounded-full'
                  : 'self-start bg-[#111] border border-[#1e1e2e] font-sans text-[#f8f8f2] rounded-bl-none shadow-lg'
              }`}
            >
              {m.text}
              {m.streaming && <span className="inline-block w-2 h-4 bg-[#ff79c6] ml-1 align-middle animate-pulse" />}
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type a prompt..."
            className="w-full bg-[#111] border border-[#1e1e2e] rounded-2xl py-4 pl-6 pr-16 text-[#f0f0f0] font-sans outline-none focus:border-[#bd93f9] transition-colors shadow-lg"
          />
          <button 
            onClick={handleSend} disabled={isGenerating || !input}
            className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-[#bd93f9] text-[#000] rounded-xl hover:bg-[#ff79c6] disabled:opacity-30 disabled:hover:bg-[#bd93f9] transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <div className="col-span-1 border border-[#1e1e2e] bg-[#0a0a0a]/50 rounded-2xl p-6 flex flex-col backdrop-blur-md">
        <h3 className="font-mono text-sm text-[#888] mb-6 flex items-center gap-2">
          <Activity size={16} className="text-[#50fa7b]" /> Swarm Block Activity
        </h3>
        
        <div className="flex-1 flex flex-col justify-center gap-1">
          {Array.from({length: 24}).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-[#555] w-8">B_{i.toString().padStart(2, '0')}</span>
              <div className="flex-1 h-2 bg-[#111] rounded-full overflow-hidden relative">
                {activeBlocks.includes(i) && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-gradient-to-r from-[#ff79c6] to-[#bd93f9] shadow-[0_0_10px_#ff79c6]"
                  />
                )}
              </div>
              <span className="font-mono text-[10px] text-[#555] w-20 text-right">
                {i < 12 ? 'Node A' : i < 20 ? 'Node B' : 'Node C'}
              </span>
            </div>
          ))}
        </div>
        
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-6 text-center font-mono text-xs text-[#ff79c6] animate-pulse"
          >
            Routing tensors through DHT...
          </motion.div>
        )}
      </div>

    </motion.div>
  );
}

// ---------------------------------------------------------
// MODEL LIBRARY (From API)
// ---------------------------------------------------------
function ModelsView() {
  const [models, setModels] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/models').then(r => r.json()).then(data => setModels(data)).catch(console.error);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-full overflow-y-auto pr-4">
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
        {models.map(m => (
          <motion.div key={m.id} whileHover={{ y: -5 }} className="border border-[#1e1e2e] bg-[#0a0a0a]/80 p-6 rounded-2xl relative overflow-hidden group cursor-pointer">
            <div className={`absolute inset-0 bg-gradient-to-br from-[${m.active ? '#50fa7b' : '#ffb86c'}]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <h2 className="text-xl font-semibold text-[#f0f0f0]">{m.name}</h2>
                <div className="font-mono text-xs text-[#888]">{m.org}</div>
              </div>
              <span className={`px-2 py-1 ${m.active ? 'bg-[#50fa7b]/10 text-[#50fa7b] border-[#50fa7b]/30' : 'bg-[#ffb86c]/10 text-[#ffb86c] border-[#ffb86c]/30'} font-mono text-[10px] rounded border`}>
                {m.active ? 'Active' : 'Partial'}
              </span>
            </div>
            <p className="text-sm text-[#888] mb-6 relative z-10">{m.desc}</p>
            <div className="flex justify-between items-center relative z-10">
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-[#111] rounded font-mono text-[10px] text-[#555]">{m.params} Params</span>
              </div>
              <button className={`px-4 py-2 ${m.active ? 'bg-[#111] border border-[#333] hover:border-[#50fa7b] hover:text-[#50fa7b]' : 'bg-[#ffb86c]/10 border border-[#ffb86c]/30 text-[#ffb86c] hover:bg-[#ffb86c]/20'} rounded font-mono text-xs transition-colors`}>
                {m.active ? 'Manage' : 'Resume Load'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------
// TRAINING LAB (Distributed Fine-Tuning)
// ---------------------------------------------------------
function TrainingView() {
  const [isTraining, setIsTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState(100.0);
  const [logs, setLogs] = useState<string[]>([]);
  const [dataPoints, setDataPoints] = useState<{x: number, y: number}[]>([{x: 0, y: 100}]);

  const pathD = `M 0,${100 - dataPoints[0].y} ` + dataPoints.map(p => `L ${p.x},${100 - p.y}`).join(' ');

  const pollStatus = async () => {
    try {
      const res = await fetch('/api/train/status');
      const data = await res.json();
      setIsTraining(data.is_training);
      setEpoch(data.epoch);
      setLoss(data.loss);
      setLogs(data.log);
      
      if (data.is_training || data.epoch > 0) {
        setDataPoints(prev => {
          const newPoints = [...prev];
          // Simple visual scaling for UI (assuming max loss is 100)
          const newY = Math.min(Math.max(data.loss, 0), 100);
          const newX = (data.epoch / data.max_epochs) * 100;
          
          if (newPoints[newPoints.length - 1].x !== newX) {
             newPoints.push({ x: newX, y: newY });
          }
          return newPoints;
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const interval = setInterval(pollStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const startTraining = async () => {
    try {
      const dataset = (document.getElementById('dataset-input') as HTMLTextAreaElement)?.value || '';
      const lr = parseFloat((document.getElementById('lr-input') as HTMLInputElement)?.value || '3e-4');
      const lora = parseInt((document.getElementById('lora-input') as HTMLInputElement)?.value || '16');

      await fetch('/api/train/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'bigscience/bloomz-560m',
          dataset: dataset,
          learning_rate: lr,
          lora_rank: lora
        })
      });
      setIsTraining(true);
      setDataPoints([{x: 0, y: 100}]);
    } catch (e) {
      console.error(e);
    }
  };

  const stopTraining = async () => {
    try {
      await fetch('/api/train/stop', { method: 'POST' });
      setIsTraining(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-full flex gap-6">
      <div className="flex-[2] flex flex-col gap-6">
        <div className="flex-1 border border-[#1e1e2e] bg-[#0a0a0a]/80 rounded-2xl p-6 relative overflow-hidden group flex flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,184,108,0.1)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="flex justify-between items-center mb-4 relative z-10">
            <h2 className="text-xl font-semibold text-[#f0f0f0] flex items-center gap-2">
              <TrendingDown className="text-[#ffb86c]" /> Training Loss (LoRA)
            </h2>
            {isTraining ? (
              <span className="px-3 py-1 bg-[#ffb86c]/20 text-[#ffb86c] font-mono text-xs rounded-full border border-[#ffb86c]/50 flex items-center gap-2 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-[#ffb86c]" /> Training Active
              </span>
            ) : (
              <span className="px-3 py-1 bg-[#111] text-[#888] font-mono text-xs rounded-full border border-[#333]">
                Ready
              </span>
            )}
          </div>

          <div className="relative w-full flex-1 flex items-end">
            <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,184,108,0.5)" />
                  <stop offset="100%" stopColor="rgba(255,184,108,0)" />
                </linearGradient>
              </defs>
              
              {[0, 25, 50, 75, 100].map(y => (
                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#1e1e2e" strokeWidth="0.5" strokeDasharray="2 2" />
              ))}

              {(dataPoints.length > 1) && (
                <>
                  <motion.path 
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ ease: "linear", duration: 0.1 }}
                    d={pathD} fill="none" stroke="#ffb86c" strokeWidth="1.5"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(255,184,108,0.5))' }}
                  />
                  <motion.path 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    d={`${pathD} L ${dataPoints[dataPoints.length-1].x},100 L 0,100 Z`} fill="url(#lossGradient)" 
                  />
                </>
              )}
            </svg>
          </div>
          
          <div className="flex justify-between font-mono text-[10px] text-[#555] mt-2">
            <span>Epoch 0</span>
            <span className="text-[#ffb86c]">Current Loss: {loss.toFixed(4)}</span>
            <span>Epoch {epoch}/10</span>
          </div>
        </div>

        <div className="h-40 border border-[#1e1e2e] bg-[#0a0a0a]/80 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
          <h3 className="font-mono text-sm text-[#888] mb-4">Distributed Gradients (Backward Pass)</h3>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#50fa7b]">Client</span>
            
            <div className="flex-1 relative h-4 bg-[#111] rounded-full overflow-hidden flex items-center px-1">
              {isTraining && (
                <>
                  <motion.div 
                    animate={{ x: ["100%", "-100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-1/3 h-2 bg-gradient-to-l from-transparent via-[#ffb86c] to-transparent rounded-full shadow-[0_0_10px_#ffb86c]"
                  />
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute w-1/4 h-1 bg-gradient-to-r from-transparent via-[#bd93f9] to-transparent rounded-full opacity-50"
                  />
                </>
              )}
            </div>
            
            <span className="font-mono text-xs text-[#bd93f9]">Swarm</span>
          </div>
          <div className="flex justify-between mt-2 font-mono text-[10px] text-[#555]">
            <span>Forward Pass (Activations) →</span>
            <span>← Backward Pass (Gradients)</span>
          </div>
        </div>
      </div>

      <div className="flex-1 border border-[#1e1e2e] bg-[#0a0a0a]/80 rounded-2xl p-6 relative flex flex-col">
        <h2 className="text-xl font-semibold text-[#f0f0f0] mb-6">Job Configuration</h2>
        
        <div className="flex flex-col gap-4 flex-1">
          <div>
            <label className="font-mono text-xs text-[#888] block mb-2">Base Model</label>
            <select className="w-full bg-[#111] border border-[#1e1e2e] rounded-lg p-3 text-sm text-[#f0f0f0] outline-none">
              <option>bigscience/bloomz-560m</option>
              <option>meta-llama/Meta-Llama-3.1-8B</option>
            </select>
          </div>

          <div>
            <label className="font-mono text-xs text-[#888] block mb-2">Dataset (JSONL or Text lines)</label>
            <textarea 
              id="dataset-input"
              className="w-full h-24 bg-[#111] border border-[#1e1e2e] rounded-lg p-3 text-sm text-[#f0f0f0] outline-none font-mono resize-none focus:border-[#ffb86c]/50 transition-colors"
              placeholder="Paste your training data here...&#10;Each line will be treated as a separate training sequence."
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs text-[#888] block mb-2">Learning Rate</label>
              <input id="lr-input" type="text" defaultValue="3e-4" className="w-full bg-[#111] border border-[#1e1e2e] rounded-lg p-3 text-sm text-[#f0f0f0] outline-none font-mono" />
            </div>
            <div>
              <label className="font-mono text-xs text-[#888] block mb-2">LoRA Rank (r)</label>
              <input id="lora-input" type="text" defaultValue="16" className="w-full bg-[#111] border border-[#1e1e2e] rounded-lg p-3 text-sm text-[#f0f0f0] outline-none font-mono" />
            </div>
          </div>
          
          <div className="flex-1 bg-[#111] border border-[#1e1e2e] rounded-lg p-4 flex flex-col gap-2 overflow-y-auto font-mono text-[10px] text-[#888]">
            {logs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
            {logs.length === 0 && <div>Server log ready...</div>}
            {isTraining && <div className="text-[#ffb86c] animate-pulse">Running backward pass...</div>}
          </div>

          <div className="pt-4 border-t border-[#1e1e2e] mt-auto">
            {isTraining ? (
              <button onClick={stopTraining} className="w-full py-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl font-semibold tracking-wide hover:bg-red-500/20 transition-all">
                STOP TRAINING
              </button>
            ) : (
              <button onClick={startTraining} className="w-full py-4 bg-[#ffb86c] text-[#000] rounded-xl font-semibold tracking-wide hover:bg-[#ffca94] transition-all shadow-[0_0_20px_rgba(255,184,108,0.2)]">
                START DISTRIBUTED TRAINING
              </button>
            )}
          </div>
        </div>
      </div>

    </motion.div>
  );
}
