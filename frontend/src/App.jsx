import { useState } from 'react'
import { 
  Car, 
  Layers, 
  Database, 
  Settings, 
  Shield, 
  Globe, 
  Users, 
  TrendingUp, 
  ClipboardList,
  Wrench,
  Smartphone,
  ChevronRight
} from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('all')

  const techStack = [
    { name: 'React (Vite)', role: 'Frontend framework with fast JSX development', icon: Globe, color: 'text-sky-400 bg-sky-950/40 border-sky-800' },
    { name: 'Tailwind CSS v4', role: 'Premium utility-first styling system', icon: Layers, color: 'text-teal-400 bg-teal-950/40 border-teal-800' },
    { name: 'ASP.NET Core Web API', role: 'High-performance C# backend services', icon: Settings, color: 'text-violet-400 bg-violet-950/40 border-violet-800' },
    { name: 'MySQL Database', role: 'Reliable transactional relational data store', icon: Database, color: 'text-amber-400 bg-amber-950/40 border-amber-800' },
  ]

  const modules = [
    { 
      title: 'Public Website', 
      desc: 'Customer-facing portal for second-hand vehicle listings, booking, and financing.', 
      type: 'public',
      features: ['Hero banner & vehicle showcase', 'Multi-attribute search & filters', '360° virtual gallery & specs', 'EMI Calculator & loan eligibility', 'Customer login, wishlist & booking', 'Self-upload car listing wizard']
    },
    { 
      title: 'ERP & CRM Portal', 
      desc: 'Internal management system for sales, operations, inventory, finance, and workshop.', 
      type: 'erp',
      features: ['Dashboard metrics & sales KPIs', 'CRM lead management & follow-ups', 'Inventory stock, pricing & status', 'Quotations & purchase order cycles', 'HRMS attendance, leave & payroll', 'Workshop mechanic allocation & spare parts']
    }
  ]

  return (
    <div className="min-h-screen bg-[#0b0f19] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-violet-600 rounded-xl shadow-lg shadow-blue-500/20">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                AUTOFLOW
              </span>
              <span className="text-xs block text-slate-500 font-semibold tracking-wider uppercase">
                Ecosystem Hub
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-emerald-950/50 border border-emerald-800 text-emerald-400 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Environment Active
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <section className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-white mb-6">
            Integrated Second-Hand <br/>
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Car Selling Ecosystem
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            A premium full-stack solution running React JS (Vite + Tailwind) on the frontend, powered by an ASP.NET Core REST API backend and a MySQL relational database.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#explore"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-medium rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200 flex items-center gap-2 group"
            >
              Explore Architecture
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <div 
              className="px-6 py-3 bg-slate-900 border border-slate-800 text-slate-300 font-medium rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer"
              onClick={() => document.getElementById('modules').scrollIntoView({ behavior: 'smooth' })}
            >
              View System Modules
            </div>
          </div>
        </section>

        {/* Tech Stack Cards */}
        <section id="explore" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-white mb-2">Technical Foundations</h2>
            <p className="text-slate-400 text-sm">Configured stack components inside the project directory</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-all duration-300 group">
                <div>
                  <div className={`p-3 rounded-xl border w-fit mb-4 transition-transform group-hover:scale-105 duration-300 ${tech.color}`}>
                    <tech.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{tech.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{tech.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Modules Showcase */}
        <section id="modules" className="mb-16 border-t border-slate-900 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-2">Ecosystem Modules</h2>
              <p className="text-slate-400 text-sm">Two independent software components sharing a unified REST API</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              {['all', 'public', 'erp'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all duration-200 capitalize ${
                    activeTab === tab
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  {tab === 'all' ? 'Show All' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {modules
              .filter((m) => activeTab === 'all' || m.type === activeTab)
              .map((m, idx) => (
                <div key={idx} className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 rounded-3xl group hover:border-slate-700 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      m.type === 'public' 
                        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' 
                        : 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                    }`}>
                      {m.type === 'public' ? 'Client Web Application' : 'Enterprise ERP Suite'}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-3">{m.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 border-b border-slate-900 pb-6">{m.desc}</p>
                  
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">Features Outlined in SRS</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {m.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-slate-400 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </section>

        {/* Directory Layout & Code Mapping */}
        <section className="bg-slate-950 border border-slate-900 rounded-3xl p-8 mb-8">
          <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Layers className="w-6 h-6 text-violet-500" />
            Project Organization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display text-lg font-bold text-blue-400 mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Frontend Directory
              </h3>
              <div className="bg-slate-900/60 p-4 rounded-xl font-mono text-xs text-slate-400 border border-slate-900">
                <div className="text-slate-300 font-bold">📂 Car/frontend/</div>
                <div className="pl-4">📂 src/</div>
                <div className="pl-8">📂 components/ <span className="text-slate-600"># UI elements</span></div>
                <div className="pl-8">📄 App.jsx <span className="text-slate-600"># Main component</span></div>
                <div className="pl-8">📄 index.css <span className="text-slate-600"># Tailwind CSS import</span></div>
                <div className="pl-4">📄 package.json <span className="text-slate-600"># Dependencies config</span></div>
                <div className="pl-4">📄 vite.config.js <span className="text-slate-600"># Vite + Tailwind V4 plugins</span></div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-violet-400 mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Backend Directory
              </h3>
              <div className="bg-slate-900/60 p-4 rounded-xl font-mono text-xs text-slate-400 border border-slate-900">
                <div className="text-slate-300 font-bold">📂 Car/backend/</div>
                <div className="pl-4">📂 Controllers/ <span className="text-slate-600"># Web API logic</span></div>
                <div className="pl-4">📂 Properties/ <span className="text-slate-600"># Launch settings</span></div>
                <div className="pl-4">📄 backend.csproj <span className="text-slate-600"># C# project settings</span></div>
                <div className="pl-4">📄 Program.cs <span className="text-slate-600"># Middleware & routing</span></div>
                <div className="pl-4">📄 appsettings.json <span className="text-slate-600"># MySQL credentials</span></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/40 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <div>
            © {new Date().getFullYear()} Integrated Second-Hand Car Selling Ecosystem. All rights reserved.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Security Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">API Reference</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Database Schema</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
