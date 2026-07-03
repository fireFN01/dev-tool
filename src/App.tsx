import { useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaPalette, FaSearch, FaCopy, FaCheck } from "react-icons/fa";

const TabBtn = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${active? "bg-brand text-white" : "bg-zinc-800 hover:bg-zinc-700"}`}>
    {icon} {label}
  </button>
);

export default function App() {
  const [tab, setTab] = useState("json");
  const [copied, setCopied] = useState("");

  const copy = (text: string) => { navigator.clipboard.writeText(text); setCopied(text); setTimeout(() => setCopied(""), 1500); };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-1">FireFN Dev Hub</motion.h1>
        <p className="text-zinc-400 mb-6">3 tool da dev in 1. Salvalo nei preferiti.</p>

        <div className="flex gap-2 mb-6 flex-wrap">
          <TabBtn active={tab === "json"} onClick={() => setTab("json")} icon={<FaCode />} label="JSON" />
          <TabBtn active={tab === "color"} onClick={() => setTab("color")} icon={<FaPalette />} label="Colors" />
          <TabBtn active={tab === "regex"} onClick={() => setTab("regex")} icon={<FaSearch />} label="Regex" />
        </div>

        <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-zinc-900 border-zinc-800 rounded-2xl p-5">
          {tab === "json" && <JsonTool copy={copy} copied={copied} />}
          {tab === "color"} && <ColorTool copy={copy} copied={copied} />}
          {tab === "regex" && <RegexTool />}
        </motion.div>
      </div>
    </div>
  );
}

function JsonTool({ copy, copied }: any) {
  const [input, setInput] = useState('{"nome":"FireFN","repo":true}');
  const [output, setOutput] = useState("");
  const format = () => { try { setOutput(JSON.stringify(JSON.parse(input), null, 2)); } catch { setOutput("JSON non valido ❌"); } };
  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-lg">JSON Formatter</h2>
      <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-32 bg-zinc-800 rounded p-3 font-mono text-sm" />
      <button onClick={format} className="px-4 py-2 bg-brand rounded">Formatta</button>
      {output && <pre className="bg-black p-3 rounded text-sm overflow-x-auto relative">{output}<button onClick={() => copy(output)} className="absolute top-2 right-2">{copied === output? <FaCheck /> : <FaCopy />}</button></pre>}
    </div>
  );
}

function ColorTool({ copy, copied }: any) {
  const gen = () => Array.from({ length: 5 }, () => `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`);
  const [colors, setColors] = useState(gen());
  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-lg">Color Palette Generator</h2>
      <button onClick={() => setColors(gen())} className="px-4 py-2 bg-brand rounded">Genera</button>
      <div className="grid grid-cols-5 gap-2">
        {colors.map(c => <div key={c} onClick={() => copy(c)} className="h-20 rounded cursor-pointer relative group" style={{ background: c }}>
          <span className="absolute bottom-1 left-1 text-xs bg-black/50 px-1 rounded">{copied === c? "Copiato!" : c}</span>
        </div>)}
      </div>
    </div>
  );
}

function RegexTool() {
  const [regex, setRegex] = useState("\\d+");
  const [text, setText] = useState("Ho 23 anni e 1 gatto");
  const [matches, setMatches] = useState<string[]>([]);
  const test = () => { try { setMatches(text.match(new RegExp(regex, "g")) || []); } catch { setMatches(["Regex invalida"]); } };
  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-lg">Regex Tester</h2>
      <input value={regex} onChange={e => setRegex(e.target.value)} placeholder="Regex" className="w-full bg-zinc-800 rounded p-2 font-mono" />
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Testo" className="w-full h-24 bg-zinc-800 rounded p-2" />
      <button onClick={test} className="px-4 py-2 bg-brand rounded">Testa</button>
      <div>Match: {matches.length > 0? matches.join(", ") : "Nessuno"}</div>
    </div>
  );
      }
