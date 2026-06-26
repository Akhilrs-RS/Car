import { useState, useEffect } from 'react'
import { 
  Search, 
  MapPin, 
  Calendar, 
  Gauge, 
  Compass, 
  IndianRupee, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Percent, 
  Clock, 
  ArrowRight,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  Award
} from 'lucide-react'


// Dummy vehicles database utilizing our generated assets
const initialVehicles = [
  {
    id: 1,
    make: "Lucid",
    model: "Air Dream Edition",
    year: 2022,
    price: 7046700,
    kmDriven: 12000,
    fuelType: "Electric",
    transmission: "Automatic",
    location: "Los Angeles",
    color: "Zenith Gold",
    image: "/hero_sports_car.png",
    category: "Premium",
    isLatest: true,
    isFeatured: true,
    rating: 4.9
  },
  {
    id: 2,
    make: "Range Rover",
    model: "Autobiography LWB",
    year: 2021,
    price: 8175500,
    kmDriven: 28000,
    fuelType: "Diesel",
    transmission: "Automatic",
    location: "San Francisco",
    color: "Santorini Black",
    image: "/featured_suv.png",
    category: "Premium",
    isLatest: false,
    isFeatured: true,
    rating: 4.8
  },
  {
    id: 3,
    make: "Rimac",
    model: "Nevera Hypercar",
    year: 2023,
    price: 15355000,
    kmDriven: 1500,
    fuelType: "Electric",
    transmission: "Automatic",
    location: "Miami",
    color: "Candy Red",
    image: "/featured_coupe.png",
    category: "Premium",
    isLatest: true,
    isFeatured: true,
    rating: 5.0
  },
  {
    id: 4,
    make: "Toyota",
    model: "Camry Hybrid",
    year: 2020,
    price: 2033500,
    kmDriven: 35000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    location: "Dallas",
    color: "Silver",
    image: "/hero_sports_car.png", // reuse
    category: "Economy",
    isLatest: true,
    isFeatured: false,
    rating: 4.6
  },
  {
    id: 5,
    make: "Honda",
    model: "Civic Touring",
    year: 2019,
    price: 1643400,
    kmDriven: 48000,
    fuelType: "Petrol",
    transmission: "Automatic",
    location: "Austin",
    color: "Steel Gray",
    image: "/featured_suv.png", // reuse
    category: "Economy",
    isLatest: false,
    isFeatured: false,
    rating: 4.5
  }
]

export default function Home({ showToast, onSelectCar, onExplore }) {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [maxPrice, setMaxPrice] = useState(20000000)
  
  // EMI Calculator state
  const [loanAmount, setLoanAmount] = useState(4000000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm] = useState(5) // in years
  const [monthlyPayment, setMonthlyPayment] = useState(0)

  // Accordion active index
  const [activeFaq, setActiveFaq] = useState(null)

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Calculate EMI
  useEffect(() => {
    const P = loanAmount
    const r = (interestRate / 100) / 12
    const n = loanTerm * 12
    if (r === 0) {
      setMonthlyPayment((P / n).toFixed(2))
    } else {
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      setMonthlyPayment(emi.toFixed(2))
    }
  }, [loanAmount, interestRate, loanTerm])

  // Filters calculation
  const brands = ['All', ...new Set(initialVehicles.map(v => v.make))]
  const locations = ['All', ...new Set(initialVehicles.map(v => v.location))]

  const filteredVehicles = initialVehicles.filter(v => {
    const matchesSearch = v.model.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.make.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBrand = selectedBrand === 'All' || v.make === selectedBrand
    const matchesLocation = selectedLocation === 'All' || v.location === selectedLocation
    const matchesPrice = v.price <= maxPrice
    return matchesSearch && matchesBrand && matchesLocation && matchesPrice
  })

  const featuredCars = filteredVehicles.filter(v => v.isFeatured)
  const latestCars = filteredVehicles.filter(v => v.isLatest)
  const premiumCars = filteredVehicles.filter(v => v.category === 'Premium')

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 4000)
  }

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <div className="bg-[#0b0f19] text-slate-100 min-h-screen font-sans">
      {/* 1. Hero Banner Section */}
      <section className="relative h-[650px] flex items-center justify-center overflow-hidden">
        {/* Background Image with elegant overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero_sports_car.png" 
            alt="Hero Sports Car" 
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/70 to-[#0b0f19]/35"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-transparent to-[#0b0f19]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
            <Award className="w-4 h-4" /> Rated #1 Certified Pre-Owned Car Dealer
          </span>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight text-white mb-6 leading-tight">
            Find Your Dream Car. <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Verified & Inspected.
            </span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Browse our curated collection of certified premium second-hand vehicles. Transparent inspection reports, instant financing approvals, and door-step delivery.
          </p>

          {/* Interactive Search Bar overlaying Hero */}
          <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-lg border border-slate-800 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl shadow-black/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Keyword Search */}
              <div className="relative">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Search Keyword</label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="e.g. Lucid Air..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl focus:border-blue-500 focus:outline-none text-sm text-white placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl focus:border-blue-500 focus:outline-none text-sm text-white appearance-none cursor-pointer"
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand} className="bg-slate-900">{brand}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl focus:border-blue-500 focus:outline-none text-sm text-white appearance-none cursor-pointer"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc} className="bg-slate-900">{loc}</option>
                  ))}
                </select>
              </div>

              {/* Price Filter Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Max Price</label>
                  <span className="text-xs font-bold text-blue-400">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input 
                  type="range"
                  min="1000000"
                  max="20000000"
                  step="500000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Brands Showcase */}
      <section className="py-12 bg-slate-950/30 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Search by Popular Brand</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {['All', 'Lucid', 'Range Rover', 'Rimac', 'Toyota', 'Honda'].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-5 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                  selectedBrand === b 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/25 scale-105' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Vehicles Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-2">Curated Premium Selection</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">Featured Cars</h2>
          </div>
          <span className="text-sm font-semibold text-slate-400">Showing {featuredCars.length} models</span>
        </div>

        {featuredCars.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 border border-slate-900 rounded-2xl">
            <p className="text-slate-400">No cars matching your specific search filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map(car => (
              <div key={car.id} className="bg-slate-900/40 border border-slate-850 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  {/* Photo Frame */}
                  <div className="relative h-56 overflow-hidden bg-slate-950">
                    <img 
                      src={car.image} 
                      alt={car.model} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-extrabold uppercase rounded-full shadow-md">
                        Featured
                      </span>
                      <span className="px-3 py-1 bg-slate-900/90 backdrop-blur-md border border-slate-800 text-slate-300 text-[10px] font-bold uppercase rounded-full">
                        {car.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-lg text-xs font-bold flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" /> {car.rating}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">{car.make}</span>
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{car.model}</h3>
                      </div>
                      <span className="text-xl font-extrabold text-blue-400">₹{car.price.toLocaleString('en-IN')}</span>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed mb-6">
                      This premium {car.make} {car.model} is certified and has undergone a rigorous 150-point inspection check.
                    </p>

                    {/* Meta Spec Grid */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-t border-slate-850 pt-4">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>Year: <strong className="text-slate-300">{car.year}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Gauge className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>Driven: <strong className="text-slate-300">{car.kmDriven.toLocaleString()} km</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Compass className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>Fuel: <strong className="text-slate-300">{car.fuelType}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                        <span className="truncate">{car.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-850 bg-slate-950/20 flex gap-3">
                  <button 
                    onClick={() => onSelectCar(car)}
                    className="flex-1 py-2.5 bg-slate-850 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl text-xs transition-colors border border-slate-800"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => showToast(`Test Drive Booking initiated for ${car.make} ${car.model}!`)}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition-colors shadow-lg shadow-blue-600/10"
                  >
                    Book Test Drive
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Latest Listings Section */}
      <section className="py-20 bg-slate-950/30 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold text-violet-500 uppercase tracking-widest block mb-2">Fresh Arrivals In Stock</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">Latest Added Vehicles</h2>
            </div>
            <span className="text-sm font-semibold text-slate-400">Showing {latestCars.length} models</span>
          </div>

          {latestCars.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/30 border border-slate-900 rounded-2xl">
              <p className="text-slate-400">No recent arrivals matching the filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestCars.map(car => (
                <div key={car.id} className="bg-slate-900/30 border border-slate-850/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-350 group flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 overflow-hidden bg-slate-950">
                      <img 
                        src={car.image} 
                        alt={car.model} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 bg-blue-500 text-white text-[9px] font-extrabold uppercase rounded-full">
                          NEW
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">{car.make}</span>
                      <h3 className="text-sm font-bold text-white truncate mb-2">{car.model}</h3>
                      <div className="text-lg font-black text-blue-400 mb-4">₹{car.price.toLocaleString('en-IN')}</div>
                      
                      <div className="flex flex-col gap-2 border-t border-slate-850/60 pt-3 text-[11px] text-slate-400">
                        <div className="flex justify-between">
                          <span>Year:</span>
                          <span className="text-slate-200 font-bold">{car.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mileage:</span>
                          <span className="text-slate-200 font-bold">{car.kmDriven.toLocaleString()} km</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fuel:</span>
                          <span className="text-slate-200 font-bold">{car.fuelType}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button 
                      onClick={() => showToast(`Vehicle inspection request submitted for ${car.make} ${car.model}!`)}
                      className="w-full py-2 bg-slate-850 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl text-xs transition-colors border border-slate-800"
                    >
                      Inspect Vehicle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Premium Cars Highlight (Visual Showcase) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl">
            <span className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-full text-xs font-bold uppercase tracking-widest inline-block mb-4">
              Premium Collection
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Indulge In Luxury. <br/>
              Only Premium Performance.
            </h2>
            <p className="text-slate-300 text-base mb-8 leading-relaxed">
              Explore hypercars, high-end electric luxury cruisers, and flagship SUVs. Standard with 12-month extended warranty, roadside assistance, and bespoke financing schemes.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-5 h-5 text-violet-400" />
                <span>Verified Ownership History</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-5 h-5 text-violet-400" />
                <span>150-Point Inspection Log</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-5 h-5 text-violet-400" />
                <span>Extended Warranty Covered</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-5 h-5 text-violet-400" />
                <span>Flexible Balloon EMI Plans</span>
              </div>
            </div>
            <button 
              onClick={() => { onExplore(); showToast("Browsing premium performance collection"); }}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-200 shadow-xl shadow-indigo-900/30"
            >
              Browse Premium Showcase
            </button>
          </div>
        </div>
      </section>

      {/* 6. Loan Offers & Interactive EMI Calculator */}
      <section className="py-20 bg-slate-950/40 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-2">Automated Finance Calculator</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-6">Loan & Finance Offers</h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
              We offer personalized financing solutions through partnered tier-1 banks. Calculate your estimated Monthly Installment (EMI) using our interactive calculator below. Adjust parameters to find the perfect plan.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-slate-900/40 border border-slate-850 rounded-2xl">
                <div className="p-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Interest Rates from 5.9% p.a.</h4>
                  <p className="text-xs text-slate-500">Subject to eligibility and credit score evaluations.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-900/40 border border-slate-850 rounded-2xl">
                <div className="p-2 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Tenure Options up to 7 Years</h4>
                  <p className="text-xs text-slate-500">Flexible repayment tenures suited to your budget preferences.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Applet */}
          <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl shadow-xl shadow-black/40">
            <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
              <IndianRupee className="w-5 h-5 text-blue-400" />
              EMI Estimator
            </h3>
            
            {/* Amount Slider */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-400">Loan Amount</span>
                <span className="text-blue-400 font-bold">₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range"
                min="500000"
                max="15000000"
                step="500000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                <span>₹5 Lakhs</span>
                <span>₹1.5 Crores</span>
              </div>
            </div>

            {/* Interest Slider */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-400">Interest Rate</span>
                <span className="text-blue-400 font-bold">{interestRate}% p.a.</span>
              </div>
              <input 
                type="range"
                min="3"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                <span>3.0%</span>
                <span>15.0%</span>
              </div>
            </div>

            {/* Tenure Select */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Loan Tenure (Years)</label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 5, 7].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setLoanTerm(yr)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all duration-200 ${
                      loanTerm === yr 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-md' 
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {yr} Yrs
                  </button>
                ))}
              </div>
            </div>

            {/* Result Board */}
            <div className="bg-slate-950/70 p-6 rounded-2xl border border-slate-850 text-center mb-6">
              <span className="text-xs text-slate-500 uppercase tracking-widest font-bold block mb-1">Estimated Monthly EMI</span>
              <div className="font-display text-3xl md:text-4xl font-black text-white">₹{monthlyPayment}</div>
            </div>

            <button 
              onClick={() => showToast(`Finance application for ₹${loanAmount.toLocaleString('en-IN')} submitted successfully!`)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-blue-600/20"
            >
              Apply For Finance Now
            </button>
          </div>
        </div>
      </section>

      {/* 7. Customer Reviews Carousel */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-2">Buyer Testimonials</span>
          <h2 className="font-display text-3xl font-extrabold text-white">What Our Customers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Sarah Jenkins', loc: 'Los Angeles', review: 'Bought a Lucid Air from Autoflow. The inspection report was spot on and their digital booking process took less than 10 minutes. Five star service!', rating: 5 },
            { name: 'David Miller', loc: 'Houston', review: 'Selling my SUV was painless. They booked an inspection, verified documents, and offered a very competitive rate instantly. Money was transferred within 24 hours.', rating: 5 },
            { name: 'Marcus Sterling', loc: 'San Francisco', review: 'Excellent customer portal. I was able to track my loan status, get notifications, and request a delivery schedule easily. Highly recommend autoflow.', rating: 4 }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900/50 border border-slate-850 p-6 rounded-2xl hover:border-slate-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  {item.rating < 5 && <Star className="w-4 h-4 text-slate-700" />}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{item.review}"</p>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-850 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-sm text-white shadow-md">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <span className="text-xs text-slate-500">{item.loc} • Verified Buyer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Blog & News */}
      <section className="py-20 bg-slate-950/30 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-2">Automotive Insights</span>
              <h2 className="font-display text-3xl font-extrabold text-white">Latest Buying Guides & Tips</h2>
            </div>
            <button 
              onClick={() => showToast("Loading all blog insights...")}
              className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
            >
              View All Blog Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: '5 Tips Before Buying a Second-Hand Electric Car', desc: 'Battery capacity retention, charging logs, and state-of-health checks are vital. Here is our checklist.', date: 'June 24, 2026', read: '5 min read' },
              { title: 'Understanding Vehicle History and RC Registration Transfer', desc: 'Ensuring clean title transfers, matching engine numbers, and checking past insurance claims.', date: 'June 18, 2026', read: '7 min read' },
              { title: 'Why Inspecting a Car Prevents Major Future Regrets', desc: 'A look into how diagnostic scanning can catch hidden hydraulic and electrical issues.', date: 'June 10, 2026', read: '4 min read' }
            ].map((post, idx) => (
              <div key={idx} className="bg-slate-900/30 border border-slate-850 p-6 rounded-2xl hover:border-slate-700 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Guide</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug hover:text-blue-400 cursor-pointer transition-colors">{post.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6">{post.desc}</p>
                </div>
                <div 
                  onClick={() => showToast(`Reading guide: "${post.title}"`)}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQs Section */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-2">Help Center</span>
          <h2 className="font-display text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {[
            { q: 'How long does a vehicle test drive booking take?', a: 'Once you schedule a booking on our website, our agent will verify details and confirm the slot within 1 hour. The car will be prepared and ready at your chosen branch or delivered to your doorstep.' },
            { q: 'What files or documents are required for loan eligibility?', a: 'You will need to upload digital copies of your Aadhaar Card, PAN Card, proof of address, and salary slips or bank statements from the past 3 months. Our ERP finance team will evaluate these files immediately.' },
            { q: 'Is registration transfer (RC transfer) covered in the service?', a: 'Yes. Autoflow manages the entire registration transfer workflow, including RTO submission, transfer fees, and new smartcard delivery to your registered address.' },
            { q: 'Can I sell my vehicle and use it as a trade-in deposit?', a: 'Absolutely. Use our "Sell Your Car" portal to upload specifications, request an inspection booking, and get a valuation. This amount can be directly credited against your new purchase.' }
          ].map((faq, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-850 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-4 flex justify-between items-center text-left font-bold text-sm text-slate-200 hover:text-white transition-colors"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? <ChevronUp className="w-4 h-4 text-blue-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-5 text-xs text-slate-400 border-t border-slate-850/50 pt-3 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. Contact Section */}
      <section className="py-20 bg-slate-950/30 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-2">Get In Touch</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-6">Contact Autoflow</h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
              Have questions about vehicle listings, finance schemes, or need to schedule an off-cycle inspection booking? Write to our customer support team or connect via live chat.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-blue-400 self-start">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Corporate Headquarters</h4>
                  <p className="text-xs text-slate-400">100 Automotive Blvd, Suite 400, Los Angeles, CA 90025</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-blue-400 self-start">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Customer Support Channel</h4>
                  <p className="text-xs text-slate-400">Email: support@autoflow.com | Phone: +1 (555) 234-5678</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl shadow-xl">
            <h3 className="font-display text-lg font-bold text-white mb-6">Send Us a Message</h3>
            
            {formSubmitted ? (
              <div className="py-12 text-center bg-blue-950/20 border border-blue-900/40 rounded-2xl text-blue-400 text-sm font-semibold">
                Message successfully sent! Our sales representative will connect soon.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl focus:border-blue-500 focus:outline-none text-xs text-white placeholder-slate-600"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl focus:border-blue-500 focus:outline-none text-xs text-white placeholder-slate-600"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                    <input 
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl focus:border-blue-500 focus:outline-none text-xs text-white placeholder-slate-600"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message</label>
                  <textarea 
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl focus:border-blue-500 focus:outline-none text-xs text-white placeholder-slate-600 resize-none"
                    placeholder="Tell us about the vehicle or service you're interested in..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors shadow-lg shadow-blue-600/10"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
