import { useState, useEffect } from 'react'
import { 
  Search, 
  MapPin, 
  Calendar, 
  Gauge, 
  Compass, 
  DollarSign, 
  Star, 
  Filter, 
  X, 
  RotateCw, 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  Sliders,
  MessageCircle,
  ChevronRight,
  BookOpen
} from 'lucide-react'

// Rich mockup database mapped with generated assets
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
    ownership: "1st Owner",
    bodyType: "Sedan",
    color: "Zenith Gold",
    image: "/hero_sports_car.png",
    category: "Premium",
    rating: 4.9,
    specs: { engine: "Dual Electric Motor", power: "933 hp", torque: "1390 Nm", efficiency: "4.6 miles/kWh", registration: "CA-892J1", insurance: "Active (Comprehensive, till June 2027)" },
    features: ["Autopilot Level 3", "21-Speaker Premium Audio", "Panoramic glass roof", "Heated & Cooled Seats", "Nappa Leather Upholstery"],
    inspection: { score: 9.6, engine: "Pass", electronics: "Pass", chassis: "Pass", history: "Clean Title (No Accidents)" }
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
    ownership: "1st Owner",
    bodyType: "SUV",
    color: "Santorini Black",
    image: "/featured_suv.png",
    category: "Premium",
    rating: 4.8,
    specs: { engine: "3.0L Twin-Turbo I6", power: "395 hp", torque: "550 Nm", efficiency: "24 mpg combined", registration: "CA-102K9", insurance: "Active (Third-Party, till Oct 2026)" },
    features: ["Four-wheel steering", "Executive rear seating", "Adaptive air suspension", "Fridge compartment", "3D Surround Camera"],
    inspection: { score: 9.4, engine: "Pass", electronics: "Pass", chassis: "Pass", history: "Clean Title (Minor scratch repair)" }
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
    ownership: "1st Owner",
    bodyType: "Coupe",
    color: "Candy Red",
    image: "/featured_coupe.png",
    category: "Premium",
    rating: 5.0,
    specs: { engine: "Quad-Motor Drivetrain", power: "1914 hp", torque: "2360 Nm", efficiency: "3.0 miles/kWh", registration: "FL-NEV1", insurance: "Active (Bespoke Track Cover, till Jan 2028)" },
    features: ["Torque Vectoring 2.0", "Carbon Ceramic Brakes", "Liquid Cooled Battery Pack", "Drift Mode", "Telemetry Over-the-air"],
    inspection: { score: 9.9, engine: "Pass", electronics: "Pass", chassis: "Pass", history: "Clean Title (Factory Maintained)" }
  },
  {
    id: 4,
    make: "Toyota",
    model: "Camry Hybrid SE",
    year: 2020,
    price: 2033500,
    kmDriven: 35000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    location: "Los Angeles",
    ownership: "2nd Owner",
    bodyType: "Sedan",
    color: "Silver",
    image: "/hero_sports_car.png",
    category: "Economy",
    rating: 4.6,
    specs: { engine: "2.5L 4-Cylinder Hybrid", power: "208 hp", torque: "221 Nm", efficiency: "47 mpg combined", registration: "CA-908B1", insurance: "Active (Comprehensive, till Aug 2026)" },
    features: ["Toyota Safety Sense 2.5", "Apple CarPlay/Android Auto", "Dual-zone climate control", "Blind Spot Monitor", "Power Driver Seat"],
    inspection: { score: 9.0, engine: "Pass", electronics: "Pass", chassis: "Pass", history: "Clean Title (2 Owners)" }
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
    location: "San Francisco",
    ownership: "2nd Owner",
    bodyType: "Sedan",
    color: "Steel Gray",
    image: "/featured_suv.png",
    category: "Economy",
    rating: 4.5,
    specs: { engine: "1.5L Turbo 4-Cylinder", power: "180 hp", torque: "240 Nm", efficiency: "36 mpg combined", registration: "CA-451H7", insurance: "Active (Comprehensive, till Dec 2026)" },
    features: ["Honda Sensing Suite", "10-Speaker Premium Sound", "Leather-trimmed seating", "Wireless charging pad", "LED Headlights"],
    inspection: { score: 8.8, engine: "Pass", electronics: "Pass", chassis: "Pass", history: "Clean Title (Minor fender bender details)" }
  }
]

export default function Listings({ showToast, preSelectedCar, clearPreSelected }) {
  // Core Filter states (11 Filters)
  const [keyword, setKeyword] = useState('')
  const [brand, setBrand] = useState('All')
  const [model, setModel] = useState('All')
  const [priceMax, setPriceMax] = useState(20000000)
  const [fuelType, setFuelType] = useState('All')
  const [transmission, setTransmission] = useState('All')
  const [maxKm, setMaxKm] = useState(60000)
  const [ownership, setOwnership] = useState('All')
  const [yearMin, setYearMin] = useState(2018)
  const [location, setLocation] = useState('All')
  const [bodyType, setBodyType] = useState('All')
  const [color, setColor] = useState('All')

  // Sorting
  const [sortBy, setSortBy] = useState('price-asc')

  // Details Modal state
  const [selectedCar, setSelectedCar] = useState(null)
  // 360 Degree angle degree simulator
  const [angleIndex, setAngleIndex] = useState(0) // 0 to 8 positions
  const [isRotating, setIsRotating] = useState(false)

  // EMI Calculator inside Modal
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm] = useState(5) // years

  // Dynamically calculate EMI when selectedCar or params change
  useEffect(() => {
    if (selectedCar) {
      const P = selectedCar.price * 0.8 // assuming 20% downpayment
      const r = (interestRate / 100) / 12
      const n = loanTerm * 12
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      setMonthlyPayment(emi.toFixed(2))
    }
  }, [selectedCar, interestRate, loanTerm])

  // Hook to handle incoming vehicle selections from Home page details triggers
  useEffect(() => {
    if (preSelectedCar) {
      setSelectedCar(preSelectedCar)
      clearPreSelected()
    }
  }, [preSelectedCar])

  // Reset Filters
  const resetFilters = () => {
    setKeyword('')
    setBrand('All')
    setModel('All')
    setPriceMax(20000000)
    setFuelType('All')
    setTransmission('All')
    setMaxKm(60000)
    setOwnership('All')
    setYearMin(2018)
    setLocation('All')
    setBodyType('All')
    setColor('All')
  }

  // Filter option arrays
  const uniqueBrands = ['All', ...new Set(initialVehicles.map(v => v.make))]
  const uniqueModels = ['All', ...new Set(initialVehicles.map(v => v.model))]
  const uniqueLocations = ['All', ...new Set(initialVehicles.map(v => v.location))]
  const uniqueBodyTypes = ['All', ...new Set(initialVehicles.map(v => v.bodyType))]
  const uniqueColors = ['All', ...new Set(initialVehicles.map(v => v.color))]

  // Apply filters
  const filteredVehicles = initialVehicles.filter(v => {
    const matchesKeyword = v.model.toLowerCase().includes(keyword.toLowerCase()) || v.make.toLowerCase().includes(keyword.toLowerCase())
    const matchesBrand = brand === 'All' || v.make === brand
    const matchesModel = model === 'All' || v.model === model
    const matchesPrice = v.price <= priceMax
    const matchesFuel = fuelType === 'All' || v.fuelType === fuelType
    const matchesTrans = transmission === 'All' || v.transmission === transmission
    const matchesKm = v.kmDriven <= maxKm
    const matchesOwnership = ownership === 'All' || v.ownership === ownership
    const matchesYear = v.year >= yearMin
    const matchesLocation = location === 'All' || v.location === location
    const matchesBody = bodyType === 'All' || v.bodyType === bodyType
    const matchesColor = color === 'All' || v.color === color

    return matchesKeyword && matchesBrand && matchesModel && matchesPrice && 
           matchesFuel && matchesTrans && matchesKm && matchesOwnership && 
           matchesYear && matchesLocation && matchesBody && matchesColor
  })

  // Apply sorting
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'year-desc') return b.year - a.year
    if (sortBy === 'km-asc') return a.kmDriven - b.kmDriven
    return 0
  })

  // Simulator loop for 360 degree view
  const triggerAutoRotate = () => {
    setIsRotating(true)
    let current = 0
    const interval = setInterval(() => {
      current = (current + 1) % 9
      setAngleIndex(current)
    }, 300)
    setTimeout(() => {
      clearInterval(interval)
      setIsRotating(false)
    }, 2700)
  }

  return (
    <div className="bg-[#0b0f19] min-h-screen text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-900 pb-6">
          <div>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-1">Ecosystem Catalog</span>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white">Vehicle Listings</h1>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Sorting control */}
            <div className="flex items-center gap-2 w-full sm:w-auto bg-slate-900 border border-slate-850 px-3 py-1.5 rounded-xl">
              <span className="text-xs text-slate-500 font-bold uppercase shrink-0">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer appearance-none pr-4"
              >
                <option value="price-asc" className="bg-slate-900 text-slate-200">Price: Low to High</option>
                <option value="price-desc" className="bg-slate-900 text-slate-200">Price: High to Low</option>
                <option value="year-desc" className="bg-slate-900 text-slate-200">Year: Newest</option>
                <option value="km-asc" className="bg-slate-900 text-slate-200">Mileage: Lowest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout: Filters Sidebar + Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* 11 Filters Sidebar (Desktop) */}
          <aside className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl h-fit sticky top-24">
            <div className="flex justify-between items-center mb-6 border-b border-slate-850 pb-4">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-400" /> Filter Options
              </h3>
              <button 
                onClick={resetFilters}
                className="text-xs font-semibold text-slate-500 hover:text-blue-400 transition-colors"
              >
                Reset All
              </button>
            </div>

            <div className="space-y-5">
              
              {/* Filter 1: Keyword search */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Search Keyword</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search model..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950/60 border border-slate-850 rounded-xl focus:border-blue-500 focus:outline-none text-xs text-white placeholder-slate-600"
                  />
                </div>
              </div>

              {/* Filter 2: Brand */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Brand</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/60 border border-slate-850 rounded-xl text-xs focus:outline-none focus:border-blue-500 cursor-pointer text-slate-300"
                >
                  {uniqueBrands.map(b => (
                    <option key={b} value={b} className="bg-slate-900">{b}</option>
                  ))}
                </select>
              </div>

              {/* Filter 3: Model */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Model</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/60 border border-slate-850 rounded-xl text-xs focus:outline-none focus:border-blue-500 cursor-pointer text-slate-300"
                >
                  {uniqueModels.map(m => (
                    <option key={m} value={m} className="bg-slate-900">{m}</option>
                  ))}
                </select>
              </div>

              {/* Filter 4: Price Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-400">Max Price</span>
                  <span className="text-blue-400">₹{priceMax.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="20000000"
                  step="500000"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Filter 5: Fuel Type */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Fuel Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {['All', 'Electric', 'Hybrid', 'Petrol', 'Diesel'].map(fuel => (
                    <button
                      key={fuel}
                      type="button"
                      onClick={() => setFuelType(fuel)}
                      className={`py-1.5 text-[10px] font-semibold border rounded-lg transition-colors ${
                        fuelType === fuel 
                          ? 'bg-blue-600 border-blue-500 text-white shadow-md' 
                          : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {fuel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 6: Transmission */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Transmission</label>
                <div className="flex gap-2">
                  {['All', 'Automatic', 'Manual'].map(trans => (
                    <button
                      key={trans}
                      type="button"
                      onClick={() => setTransmission(trans)}
                      className={`flex-1 py-1.5 text-[10px] font-semibold border rounded-lg transition-colors ${
                        transmission === trans 
                          ? 'bg-blue-600 border-blue-500 text-white' 
                          : 'bg-slate-950/40 border-slate-850 text-slate-400'
                      }`}
                    >
                      {trans}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 7: KM Driven */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-400">Max KM Driven</span>
                  <span className="text-blue-400">{maxKm.toLocaleString()} km</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="60000"
                  step="2500"
                  value={maxKm}
                  onChange={(e) => setMaxKm(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Filter 8: Ownership */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Ownership</label>
                <select
                  value={ownership}
                  onChange={(e) => setOwnership(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/60 border border-slate-850 rounded-xl text-xs focus:outline-none focus:border-blue-500 text-slate-300"
                >
                  <option value="All">All Ownership</option>
                  <option value="1st Owner">1st Owner</option>
                  <option value="2nd Owner">2nd Owner</option>
                </select>
              </div>

              {/* Filter 9: Minimum Year */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-400">Minimum Year</span>
                  <span className="text-blue-400">{yearMin}</span>
                </div>
                <input
                  type="range"
                  min="2018"
                  max="2023"
                  step="1"
                  value={yearMin}
                  onChange={(e) => setYearMin(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Filter 10: Location */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/60 border border-slate-850 rounded-xl text-xs focus:outline-none focus:border-blue-500 text-slate-300"
                >
                  {uniqueLocations.map(l => (
                    <option key={l} value={l} className="bg-slate-900">{l}</option>
                  ))}
                </select>
              </div>

              {/* Filter 11: Body Type */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Body Type</label>
                <select
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/60 border border-slate-850 rounded-xl text-xs focus:outline-none focus:border-blue-500 text-slate-300"
                >
                  {uniqueBodyTypes.map(bt => (
                    <option key={bt} value={bt} className="bg-slate-900">{bt}</option>
                  ))}
                </select>
              </div>

            </div>
          </aside>

          {/* Listings Catalog Grid */}
          <main className="lg:col-span-3">
            {sortedVehicles.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/20 border border-slate-900 rounded-2xl">
                <HelpCircle className="w-12 h-12 text-slate-650 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">No Vehicles Found</h3>
                <p className="text-slate-500 text-xs max-w-sm mx-auto">Try relaxing your search terms or resetting the filter options on the left sidebar.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedVehicles.map(car => (
                  <div 
                    key={car.id} 
                    className="bg-slate-900/30 border border-slate-850/80 rounded-2xl overflow-hidden hover:border-slate-700 hover:bg-slate-900/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    onClick={() => setSelectedCar(car)}
                  >
                    <div>
                      {/* Image panel */}
                      <div className="relative h-48 bg-slate-950 overflow-hidden">
                        <img 
                          src={car.image} 
                          alt={car.model} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2 py-0.5 bg-blue-600/90 text-white rounded text-[9px] font-extrabold uppercase">
                          {car.category}
                        </div>
                        <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-slate-900/80 backdrop-blur-md rounded text-[10px] font-bold text-amber-400 border border-slate-850 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" /> {car.rating}
                        </div>
                      </div>

                      {/* Content panel */}
                      <div className="p-5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">{car.make}</span>
                        <h3 className="text-base font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{car.model}</h3>
                        
                        <div className="grid grid-cols-2 gap-y-2 gap-x-2 border-t border-b border-slate-850/60 py-3 mb-3 text-[11px] text-slate-400">
                          <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" /> {car.year}</div>
                          <div className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5 text-slate-500 shrink-0" /> {car.kmDriven.toLocaleString()} km</div>
                          <div className="flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-slate-500 shrink-0" /> {car.fuelType}</div>
                          <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" /> {car.location}</div>
                        </div>

                        <p className="text-slate-500 text-[10px] leading-relaxed line-clamp-2">
                          Excellent pre-owned {car.model} in {car.color}. Passed extensive mechanical and electric testing logs with certificate score {car.inspection.score}/10.
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center justify-between">
                      <span className="text-lg font-black text-blue-400">₹{car.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs font-bold text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Explore Specifications <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Full Screen Vehicle Details Portal Modal */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex justify-center items-start p-4 md:p-10">
          <div className="bg-[#0b0f19] border border-slate-800 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl relative animate-scale-up">
            
            {/* Close Trigger */}
            <button 
              onClick={() => setSelectedCar(null)}
              className="absolute top-6 right-6 p-2 bg-slate-900 hover:bg-slate-800 border border-slate-850 rounded-full text-slate-400 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Scroll Content */}
            <div className="p-6 md:p-10 max-h-[85vh] overflow-y-auto space-y-10">
              
              {/* Header Title */}
              <div className="border-b border-slate-850 pb-6">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-1">Ecosystem Catalog • ID #{(selectedCar.id + 1000)}</span>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
                      {selectedCar.make} {selectedCar.model}
                      <span className="text-xs font-bold bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded">
                        {selectedCar.ownership}
                      </span>
                    </h2>
                  </div>
                  <span className="text-2xl font-black text-blue-400">₹{selectedCar.price.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Core Specs Overview Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/60 p-4 border border-slate-850 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Make Year</span>
                  <span className="text-sm font-bold text-white">{selectedCar.year}</span>
                </div>
                <div className="bg-slate-900/60 p-4 border border-slate-850 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">KM Driven</span>
                  <span className="text-sm font-bold text-white">{selectedCar.kmDriven.toLocaleString()} km</span>
                </div>
                <div className="bg-slate-900/60 p-4 border border-slate-850 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Fuel Economy</span>
                  <span className="text-sm font-bold text-white">{selectedCar.fuelType}</span>
                </div>
                <div className="bg-slate-900/60 p-4 border border-slate-850 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Transmission</span>
                  <span className="text-sm font-bold text-white">{selectedCar.transmission}</span>
                </div>
              </div>

              {/* Main Media & 360 Gallery Selector */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 360 degree visualizer panel */}
                <div className="lg:col-span-2 bg-slate-950 border border-slate-900 rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[350px]">
                  
                  {/* Rotating Frame */}
                  <div className="relative w-full h-[260px] flex items-center justify-center">
                    <img
                      src={selectedCar.image}
                      alt="Rotating Car"
                      className="w-full h-full object-cover transition-transform duration-500"
                      style={{ transform: `rotateY(${(angleIndex * 40)}deg)` }}
                    />
                  </div>

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold rounded-lg uppercase tracking-wide flex items-center gap-1.5">
                      <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} /> Interactive 360° Visualizer
                    </span>
                  </div>

                  {/* Visualizer Dial Control */}
                  <div className="w-full mt-4 flex items-center gap-4 border-t border-slate-900 pt-4">
                    <button 
                      onClick={triggerAutoRotate}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-850 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0"
                    >
                      <RotateCw className="w-3.5 h-3.5" /> Auto-Spin
                    </button>
                    
                    <input 
                      type="range"
                      min="0"
                      max="8"
                      value={angleIndex}
                      onChange={(e) => setAngleIndex(Number(e.target.value))}
                      className="flex-grow h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <span className="text-[10px] font-bold font-mono text-slate-500 uppercase">Angle {(angleIndex * 45)}°</span>
                  </div>
                </div>

                {/* Right Side Options: Finance Estimator / Contact */}
                <div className="bg-slate-900 border border-slate-850 p-6 rounded-3xl flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-widest border-b border-slate-850 pb-2">Purchase & Delivery</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium">Availability:</span>
                        <span className="text-emerald-400 font-bold">In Stock (Los Angeles)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium">Estimated EMI:</span>
                        <span className="text-blue-400 font-bold">₹{monthlyPayment} / mo</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium">Est. Delivery Time:</span>
                        <span className="text-slate-300 font-semibold">3-5 Days Door-Step</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-slate-850">
                    <button 
                      onClick={() => showToast(`Booking request received! Vehicle ID #${selectedCar.id + 1000} (${selectedCar.make} ${selectedCar.model}) is now reserved for you.`)}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors shadow-lg shadow-blue-600/10"
                    >
                      Reserve & Book Now
                    </button>
                    <button 
                      onClick={() => showToast(`Inspection report requested! Full diagnostic logs for ${selectedCar.make} ${selectedCar.model} sent to your registered email.`)}
                      className="w-full py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold rounded-xl text-xs transition-colors border border-slate-850"
                    >
                      Request Inspection Logs
                    </button>
                    <a 
                      href={`https://wa.me/1234567890?text=Hi,%20I%20am%20interested%20in%20the%20${selectedCar.make}%20${selectedCar.model}`}
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/10"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp Enquiry
                    </a>
                  </div>
                </div>

              </div>

              {/* Technical Specifications Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Tech Specs */}
                <div>
                  <h3 className="font-display font-extrabold text-lg text-white mb-4 border-b border-slate-900 pb-3 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-blue-400" /> Technical Specifications
                  </h3>
                  <table className="w-full text-xs">
                    <tbody>
                      <tr className="border-b border-slate-900">
                        <td className="py-2.5 text-slate-500 font-medium">Engine / Motor Type</td>
                        <td className="py-2.5 text-slate-200 font-bold text-right">{selectedCar.specs.engine}</td>
                      </tr>
                      <tr className="border-b border-slate-900">
                        <td className="py-2.5 text-slate-500 font-medium">Maximum Power Output</td>
                        <td className="py-2.5 text-slate-200 font-bold text-right">{selectedCar.specs.power}</td>
                      </tr>
                      <tr className="border-b border-slate-900">
                        <td className="py-2.5 text-slate-500 font-medium">Peak Torque</td>
                        <td className="py-2.5 text-slate-200 font-bold text-right">{selectedCar.specs.torque}</td>
                      </tr>
                      <tr className="border-b border-slate-900">
                        <td className="py-2.5 text-slate-500 font-medium">Efficiency Index</td>
                        <td className="py-2.5 text-slate-200 font-bold text-right">{selectedCar.specs.efficiency}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Comfort & Infotainment Features */}
                <div>
                  <h3 className="font-display font-extrabold text-lg text-white mb-4 border-b border-slate-900 pb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" /> Comfort & Features
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                    {selectedCar.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Certified Inspection Report & Registration Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Inspection Report */}
                <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-wider border-b border-slate-850 pb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-400" /> Certified Inspection Log
                    </h3>
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-extrabold text-lg text-white shadow-lg shadow-indigo-900/30">
                        {selectedCar.inspection.score}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white mb-0.5">Overall Certified Health Score</h4>
                        <p className="text-[10px] text-slate-500">Passed strict dynamic road, engine testing log.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Engine: OK</div>
                      <div className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Electronics: OK</div>
                      <div className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Chassis: OK</div>
                    </div>
                  </div>
                  
                  <div className="text-[10px] text-slate-500 mt-6 border-t border-slate-850 pt-3">
                    Report Reference: <strong className="text-slate-400">{selectedCar.inspection.history}</strong>
                  </div>
                </div>

                {/* RC & Insurance Cards */}
                <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-wider border-b border-slate-850 pb-2 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-blue-400" /> Registration & RC Details
                    </h3>
                    
                    <div className="space-y-3.5 text-xs text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-semibold">RC smartcard ID:</span>
                        <span className="font-mono text-slate-200">{selectedCar.specs.registration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-semibold">Insurance status:</span>
                        <span className="text-emerald-400 font-bold">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-semibold">Cover policy type:</span>
                        <span className="text-slate-200">{selectedCar.specs.insurance}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 border-t border-slate-850 pt-3 mt-4">
                    All transfer documents are processed in-house by our RTO agents.
                  </div>
                </div>

              </div>

              {/* Similar Vehicles Suggestions */}
              <div>
                <h3 className="font-display font-extrabold text-lg text-white mb-6 border-b border-slate-900 pb-3">Similar Vehicles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {initialVehicles
                    .filter(v => v.id !== selectedCar.id && (v.bodyType === selectedCar.bodyType || v.category === selectedCar.category))
                    .slice(0, 3)
                    .map(sim => (
                      <div 
                        key={sim.id} 
                        onClick={() => { setSelectedCar(sim); setAngleIndex(0); }}
                        className="bg-slate-900/40 border border-slate-850 p-4 rounded-xl hover:border-slate-700 transition-colors cursor-pointer flex gap-3 items-center"
                      >
                        <img src={sim.image} alt={sim.model} className="w-16 h-12 object-cover bg-slate-950 rounded-lg shrink-0" />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-white truncate">{sim.make} {sim.model}</h4>
                          <span className="text-xs font-black text-blue-455">₹{sim.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}
