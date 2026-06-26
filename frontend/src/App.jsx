import { useState } from 'react'
import { 
  Car, 
  LayoutDashboard, 
  Globe, 
  Settings, 
  TrendingUp, 
  Users, 
  ClipboardList, 
  IndianRupee,
  Package,
  Wrench,
  UserCheck,
  CheckCircle,
  X
} from 'lucide-react'
import Home from './components/Home'
import Listings from './components/Listings'

export default function App() {
  const [currentView, setCurrentView] = useState('public') // 'public' or 'erp'
  const [currentPage, setCurrentPage] = useState('home') // 'home' or 'listings'
  
  // Shared state to allow Home page details buttons to open specific listings modal
  const [preSelectedCar, setPreSelectedCar] = useState(null)

  // Toast state
  const [toast, setToast] = useState({ show: false, message: '' })

  const showToast = (message) => {
    setToast({ show: true, message })
    setTimeout(() => {
      setToast({ show: false, message: '' })
    }, 4000)
  }

  // ERP Mock Data
  const kpis = [
    { title: 'Total Sales Revenue', value: '₹2,04,01,400', desc: '+12.5% from last month', icon: IndianRupee, color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800' },
    { title: 'Active Inventory', value: '42 Cars', desc: '12 premium, 30 economy', icon: Package, color: 'text-blue-400 bg-blue-950/40 border-blue-800' },
    { title: 'New Customer Leads', value: '18 Leads', desc: '4 pending test drive approval', icon: Users, color: 'text-violet-400 bg-violet-950/40 border-violet-800' },
    { title: 'Workshop Job Cards', value: '8 Active', desc: '3 awaiting spare parts', icon: Wrench, color: 'text-amber-400 bg-amber-950/40 border-amber-800' },
  ]

  const erpLeads = [
    { id: 'LD-1024', customer: 'Sarah Jenkins', vehicle: 'Lucid Air', status: 'Approved', type: 'Finance Application', date: '2026-06-25' },
    { id: 'LD-1025', customer: 'David Miller', vehicle: 'Range Rover autobiography', status: 'Pending Review', type: 'Test Drive Booking', date: '2026-06-26' },
    { id: 'LD-1026', customer: 'Marcus Sterling', vehicle: 'Rimac Nevera', status: 'Contacted', type: 'Vehicle Enquiry', date: '2026-06-26' },
  ]

  const handleCarSelectFromHome = (car) => {
    setPreSelectedCar(car)
    setCurrentPage('listings')
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans relative">
      {/* Universal Ecosystem Navigation Header */}
      <header className="border-b border-slate-800 bg-[#0b0f19]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand & Navigation Links */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setCurrentView('public'); setCurrentPage('home'); }}>
              <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-violet-600 rounded-xl shadow-lg shadow-blue-500/20">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  AUTOFLOW
                </span>
                <span className="text-xs block text-slate-500 font-semibold tracking-wider uppercase">
                  Integrated Ecosystem
                </span>
              </div>
            </div>

            {/* Public Website Navigation Links */}
            {currentView === 'public' && (
              <nav className="flex items-center gap-5 border-l border-slate-800 pl-6 h-8">
                <button
                  onClick={() => setCurrentPage('home')}
                  className={`text-xs font-bold tracking-wide uppercase transition-colors ${
                    currentPage === 'home' 
                      ? 'text-blue-400' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => setCurrentPage('listings')}
                  className={`text-xs font-bold tracking-wide uppercase transition-colors ${
                    currentPage === 'listings' 
                      ? 'text-blue-400' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Browse Vehicles
                </button>
              </nav>
            )}
          </div>

          {/* Toggle Switches between System 1 (Website) & System 2 (ERP) */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850">
            <button
              onClick={() => setCurrentView('public')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                currentView === 'public'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Public Website
            </button>
            <button
              onClick={() => setCurrentView('erp')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                currentView === 'erp'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              ERP & CRM Portal
            </button>
          </div>

          {/* Environment Status */}
          <div className="hidden md:flex items-center gap-3">
            <span className="flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-slate-900 border border-slate-800 text-slate-400 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Sync
            </span>
          </div>

        </div>
      </header>

      {/* Main View Area */}
      <div className="flex-1">
        {currentView === 'public' ? (
          /* System 1: Public Website Portal (Home or Listings) */
          currentPage === 'home' ? (
            <Home 
              showToast={showToast} 
              onSelectCar={handleCarSelectFromHome} 
              onExplore={() => setCurrentPage('listings')} 
            />
          ) : (
            <Listings 
              showToast={showToast} 
              preSelectedCar={preSelectedCar} 
              clearPreSelected={() => setPreSelectedCar(null)} 
            />
          )
        ) : (
          /* System 2: Management Software ERP & CRM Dashboard */
          <section className="max-w-7xl mx-auto px-6 py-10 animate-fade-in">
            {/* Header info */}
            <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-xs font-bold text-violet-400 uppercase tracking-widest block mb-1">Internal Operations</span>
                <h1 className="font-display text-3xl font-extrabold text-white">Management Software Dashboard</h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-semibold">User Role: <strong className="text-violet-400">System Admin</strong></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                <span className="text-xs text-slate-400 font-semibold">Branch: <strong className="text-violet-400">All Locations</strong></span>
              </div>
            </div>

            {/* ERP KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {kpis.map((kpi, idx) => (
                <div 
                  key={idx} 
                  onClick={() => showToast(`Opening detailed reports for: ${kpi.title}`)}
                  className="bg-slate-900/50 border border-slate-855 p-6 rounded-2xl flex items-center justify-between cursor-pointer hover:border-violet-500/50 hover:bg-slate-900 transition-all group"
                >
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-1">{kpi.title}</span>
                    <span className="text-2xl font-extrabold text-white block mb-1 group-hover:text-violet-400 transition-colors">{kpi.value}</span>
                    <span className="text-[10px] font-bold text-slate-400">{kpi.desc}</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${kpi.color} transition-transform group-hover:scale-105`}>
                    <kpi.icon className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>

            {/* CRM Lead Pipeline & Stock Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Lead Pipeline */}
              <div className="bg-slate-900/30 border border-slate-855 p-6 rounded-2xl lg:col-span-2">
                <div className="flex justify-between items-center mb-6 border-b border-slate-850 pb-4">
                  <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-violet-400" />
                    Recent CRM Inquiries & Bookings
                  </h3>
                  <button 
                    onClick={() => showToast("Loading full customer CRM pipeline layout...")}
                    className="text-xs font-bold text-violet-400 hover:text-violet-300"
                  >
                    View All Leads
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-850 text-slate-500 font-bold uppercase tracking-wider">
                        <th className="pb-3">Lead ID</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Vehicle Spec</th>
                        <th className="pb-3">Request Type</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      {erpLeads.map((lead) => (
                        <tr 
                          key={lead.id} 
                          onClick={() => showToast(`Opening CRM file card for ${lead.customer}`)}
                          className="border-b border-slate-850/60 hover:bg-slate-900/40 transition-colors cursor-pointer"
                        >
                          <td className="py-3.5 font-mono text-slate-400">{lead.id}</td>
                          <td className="py-3.5 font-semibold text-white">{lead.customer}</td>
                          <td className="py-3.5">{lead.vehicle}</td>
                          <td className="py-3.5">
                            <span className="px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-850 text-[10px] font-medium">
                              {lead.type}
                            </span>
                          </td>
                          <td className="py-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              lead.status === 'Approved' 
                                ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800' 
                                : lead.status === 'Pending Review' 
                                  ? 'bg-amber-950/40 text-amber-400 border border-amber-800'
                                  : 'bg-blue-950/40 text-blue-400 border border-blue-800'
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Status Breakdown / Tools Panel */}
              <div className="bg-slate-900/30 border border-slate-855 p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-6 border-b border-slate-850 pb-4">
                  <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-violet-400" />
                    ERP Operations Control
                  </h3>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => showToast("Opening Procurement Module: active vendor contracts loaded.")}
                    className="w-full p-3.5 bg-slate-900/60 border border-slate-850 text-left rounded-xl hover:border-violet-500 hover:bg-slate-900 transition-all flex items-center gap-3 group"
                  >
                    <div className="p-2 bg-violet-950/50 text-violet-400 rounded-lg group-hover:scale-105 duration-200">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-0.5">Procurement / Purchase Orders</h4>
                      <p className="text-[10px] text-slate-500">Manage vendor details and inventory purchase.</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => showToast("Opening Workshop Module: mechanic worksheets and spare logs sync.")}
                    className="w-full p-3.5 bg-slate-900/60 border border-slate-855 text-left rounded-xl hover:border-violet-500 hover:bg-slate-900 transition-all flex items-center gap-3 group"
                  >
                    <div className="p-2 bg-violet-950/50 text-violet-400 rounded-lg group-hover:scale-105 duration-200">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-0.5">Workshop Job Cards</h4>
                      <p className="text-[10px] text-slate-500">Assign mechanics and track vehicle service stages.</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => showToast("Opening Billing Module: balance sheet & GST invoicing options ready.")}
                    className="w-full p-3.5 bg-slate-900/60 border border-slate-855 text-left rounded-xl hover:border-violet-500 hover:bg-slate-900 transition-all flex items-center gap-3 group"
                  >
                    <div className="p-2 bg-violet-950/50 text-violet-400 rounded-lg group-hover:scale-105 duration-200">
                      <ClipboardList className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-0.5">Accounts & Billing Cycles</h4>
                      <p className="text-[10px] text-slate-500">View ledgers, cashbooks, and generate GST invoices.</p>
                    </div>
                  </button>
                </div>
              </div>

            </div>
          </section>
        )}
      </div>

      {/* Floating Animated Toast Banner */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-[100] max-w-sm bg-slate-900/90 backdrop-blur-md border border-blue-500/40 p-4 rounded-2xl shadow-2xl flex items-start gap-3 animate-slide-in">
          <div className="p-1 bg-blue-500/10 text-blue-400 rounded-lg">
            <CheckCircle className="w-5 h-5 shrink-0" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-white mb-0.5">Ecosystem Action Sync</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">{toast.message}</p>
          </div>
          <button 
            onClick={() => setToast({ show: false, message: '' })}
            className="text-slate-500 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Universal Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/40 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <div>
            © {new Date().getFullYear()} Autoflow Ecosystem. Built under software requirement specifications.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 cursor-pointer" onClick={() => showToast("Displaying security policy data...")}>Security Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer" onClick={() => showToast("Opening API sandbox documentation...")}>API Reference</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer" onClick={() => showToast("Loading MySQL relational database schemas...")}>Database Schema</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
