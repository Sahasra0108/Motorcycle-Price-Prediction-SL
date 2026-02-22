"use client"
import { useState, useEffect } from "react"
import { 
  Bike, Calendar, MapPin, Gauge, Zap, DollarSign, ArrowLeft, 
  Home, Info, BarChart3, TrendingUp, TrendingDown, Minus,
  HelpCircle, X
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PredictionForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    Brand: "",
    Model: "",
    Year: "",
    Type: "",
    Mileage: "",
    Capacity: "",
    Location: ""
  })

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [explanation, setExplanation] = useState(null)
  const [explanationLoading, setExplanationLoading] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  
  const [availableModels, setAvailableModels] = useState([])
  const [brands, setBrands] = useState([])
  const [locations, setLocations] = useState([])
  const [models, setModels] = useState({})

   
  useEffect(() => {
    setBrands([
      "Bajaj", "Honda", "Yamaha", "TVS", "Hero", "Suzuki", 
      "Demak", "Ranomoto", "Mahindra", "Kawasaki", "KTM", "Other"
    ])
    
    setLocations([
      "Colombo", "Gampaha", "Kalutara", "Kandy", "Galle", "Kurunegala",
      "Matara", "Jaffna", "Anuradhapura", "Polonnaruwa", "Badulla",
      "Ratnapura", "Kegalle", "Trincomalee", "Batticaloa"
    ])

    setModels({
      "Bajaj": ["Pulsar 150", "Pulsar 180", "Pulsar 220", "Discover", "Platina", "Avenger", "Dominar", "CT 100"],
      "Honda": ["CBR 150", "CBR 250", "CBR 650R", "CB Shine", "Unicorn", "Hornet", "Dio", "Activa", "Grazia"],
      "Yamaha": ["YZF R15", "FZ", "FZ-S", "MT-15", "Fascino", "Ray ZR", "Alpha", "R3"],
      "TVS": ["Apache RTR 160", "Apache RTR 180", "Apache RR 310", "Jupiter", "Ntorq", "Sport", "XL100"],
      "Hero": ["Splendor", "Passion", "HF Deluxe", "Glamour", "Xpulse 200", "Xtreme 200"],
      "Suzuki": ["Gixxer", "Gixxer SF", "Access 125", "Burgman Street", "Intruder", "Hayate"],
      "Demak": ["DZR 150", "DZ 125", "DTX 150", "MV 125", "DYM 125"],
      "Ranomoto": ["Ranger", "Nomad", "Voyager"],
      "Mahindra": ["Centuro", "Mojo", "Duro", "Gusto"],
      "Other": ["Other model"]
    })
  }, [])

  // Update available models when brand changes
  useEffect(() => {
    if (formData.Brand && models[formData.Brand]) {
      setAvailableModels(models[formData.Brand])
      if (!models[formData.Brand].includes(formData.Model)) {
        setFormData(prev => ({ ...prev, Model: "" }))
      }
    } else {
      setAvailableModels([])
    }
  }, [formData.Brand, models])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    setExplanation(null)
    setShowExplanation(false)

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          Year: Number(formData.Year),
          Mileage: Number(formData.Mileage),
          Capacity: Number(formData.Capacity)
        })
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setResult(data.predicted_price)
      
      // Automatically fetch explanation after getting prediction
      fetchExplanation()

    } catch (err) {
      setError("Prediction failed. Please check your inputs and try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchExplanation = async () => {
    setExplanationLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:5000/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          Year: Number(formData.Year),
          Mileage: Number(formData.Mileage),
          Capacity: Number(formData.Capacity)
        })
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setExplanation(data)
      setShowExplanation(true)

    } catch (err) {
      console.error("Explanation failed:", err)
    } finally {
      setExplanationLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      Brand: "",
      Model: "",
      Year: "",
      Type: "",
      Mileage: "",
      Capacity: "",
      Location: ""
    })
    setResult(null)
    setError(null)
    setExplanation(null)
    setShowExplanation(false)
  }

  // Helper function to get impact color and icon
  const getImpactInfo = (shapValue) => {
    if (shapValue > 0) {
      return {
        color: "text-green-600",
        bgColor: "bg-green-50",
        icon: TrendingUp,
        text: "Increases price"
      }
    } else if (shapValue < 0) {
      return {
        color: "text-red-600",
        bgColor: "bg-red-50",
        icon: TrendingDown,
        text: "Decreases price"
      }
    } else {
      return {
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        icon: Minus,
        text: "Neutral impact"
      }
    }
  }

  // Format feature name for display
  const formatFeatureName = (feature) => {
    return feature.replace(/_/g, ' ')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full mb-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
            <Bike className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-slide-up">
            Sri Lanka Used Bike Price Predictor
          </h1>
          <p className="text-gray-600 animate-slide-up animation-delay-200">
            Enter your bike details below for an instant market estimate with AI-powered explanations
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Enter Bike Details
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Brand */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 text-black">
                  <Bike size={16} /> Brand <span className="text-red-500">*</span>
                </label>
                <select
                  name="Brand"
                  value={formData.Brand}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 text-black bg-white"
                >
                  <option value="">Select Brand</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Model */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 text-black">
                  <Info size={16} /> Model <span className="text-red-500">*</span>
                </label>
                <select
                  name="Model"
                  value={formData.Model}
                  onChange={handleChange}
                  required
                  disabled={!formData.Brand}
                  className={`w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 text-black bg-white
                    ${!formData.Brand ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <option value="">Select Model</option>
                  {availableModels.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 text-black">
                  <Calendar size={16} /> Year <span className="text-red-500">*</span>
                </label>
                <select
                  name="Year"
                  value={formData.Year}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 text-black bg-white"
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 30 }, (_, i) => 2025 - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 text-black">
                  <Zap size={16} /> Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="Type"
                  value={formData.Type}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 text-black bg-white"
                >
                  <option value="">Select Type</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Scooter">Scooter</option>
                  <option value="Electric">Electric</option>
                  <option value="Quadricycle">Quadricycle</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 text-black">
                  <MapPin size={16} /> Location <span className="text-red-500">*</span>
                </label>
                <select
                  name="Location"
                  value={formData.Location}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 text-black bg-white"
                >
                  <option value="">Select Location</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Capacity */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 text-black">
                  <Gauge size={16} /> Engine Capacity (cc) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="Capacity"
                  value={formData.Capacity}
                  onChange={handleChange}
                  placeholder="e.g., 150"
                  min="50"
                  max="2000"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 text-black bg-white"
                />
              </div>

              {/* Mileage */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 text-black">
                  <Gauge size={16} /> Mileage (km) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="Mileage"
                  value={formData.Mileage}
                  onChange={handleChange}
                  placeholder="e.g., 25000"
                  min="0"
                  max="300000"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 text-black bg-white"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold 
                  hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Predicting...
                  </span>
                ) : "Predict Price"}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
              >
                Reset Form
              </button>
            </div>

            {/* Result Section */}
            {result !== null && (
              <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 animate-fade-in">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Predicted Price</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-green-600">
                        Rs {result.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-green-600 mt-2">
                      This is an estimated market price based on similar bikes
                    </p>
                  </div>
                  
                  {/* AI Explanation Button */}
                  <button
                    type="button"
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <BarChart3 size={18} />
                    {showExplanation ? "Hide Explanation" : "How was this calculated?"}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200 animate-fade-in">
                <p className="text-red-600 text-center">{error}</p>
              </div>
            )}
          </form>
        </div>

        {/* Explanation Section */}
        {showExplanation && explanation && (
          <div className="mt-6 bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                AI Explanation: How We Calculated This Price
              </h2>
            </div>
            
            <div className="p-6">
              {explanationLoading ? (
                <div className="flex justify-center items-center py-12">
                  <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800">
                      <span className="font-semibold">Base price: </span>
                      Rs {explanation.expected_value.toLocaleString()}
                    </p>
                    <p className="text-blue-600 text-sm mt-1">
                      This is the average price for similar bikes. Your bike's price is adjusted based on the factors below.
                    </p>
                  </div>

                  {/* Feature Importance List */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Factors Influencing Your Bike's Price</h3>
                    <div className="space-y-3">
                      {explanation.feature_importance.map((item, index) => {
                        const impact = getImpactInfo(item.shap_value)
                        const ImpactIcon = impact.icon
                        
                        return (
                          <div key={index} className={`p-4 rounded-lg border ${impact.bgColor} border-gray-200`}>
                            <div className="flex items-start gap-3">
                              <div className={`mt-1 ${impact.color}`}>
                                <ImpactIcon size={20} />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-semibold text-gray-800">
                                      {formatFeatureName(item.feature)}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                      Value: {item.feature_value}
                                    </p>
                                  </div>
                                  <span className={`text-sm font-medium ${impact.color}`}>
                                    {item.shap_value > 0 ? '+' : ''}{item.shap_value.toFixed(2)}
                                  </span>
                                </div>
                                
                                {/* Impact bar visualization */}
                                <div className="mt-2 relative h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`absolute top-0 left-1/2 h-full ${item.shap_value > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                                    style={{
                                      width: `${Math.min(Math.abs(item.shap_value) * 10, 50)}%`,
                                      left: item.shap_value > 0 ? '50%' : `${50 - Math.min(Math.abs(item.shap_value) * 10, 50)}%`
                                    }}
                                  />
                                </div>
                                
                                <p className={`text-xs mt-1 ${impact.color}`}>
                                  {impact.text} price by Rs {Math.abs(item.shap_value).toFixed(0)}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Educational Note */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex gap-3">
                      <HelpCircle className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">How to interpret this</h4>
                        <p className="text-sm text-gray-600">
                          Green factors <span className="text-green-600">↑</span> increase the price, red factors <span className="text-red-600">↓</span> decrease it. 
                          The longer the colored bar, the stronger the impact. This explanation is generated using SHAP 
                          (SHapley Additive exPlanations), a technique that shows how each feature contributes to the final prediction.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Powered by Machine Learning with SHAP Explainability • Model trained on 5000+ Sri Lankan bike listings</p>
          <p className="mt-1">Prices are estimates and may vary based on actual bike condition</p>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  )
}