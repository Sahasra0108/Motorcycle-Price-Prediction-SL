"use client"
import { useState, useEffect, useRef } from "react"
import { 
  Bike, TrendingUp, DollarSign, Zap, Award, ArrowRight, 
  Star, Users, Shield, Clock, MapPin, Calendar, Gauge,
  ChevronRight, Sparkles, Target, Gem, Rocket
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import bikeImage from "../../Images/bike3.png"

export default function HomePage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    setIsVisible(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Instant Predictions",
      description: "Get accurate price estimates in seconds with our ML model"
    },
    {
      icon: <Award className="w-6 h-6 text-blue-500" />,
      title: "95% Accuracy",
      description: "Trained on 5000+ real Sri Lankan bike listings"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      title: "Market Insights",
      description: "Based on current market trends and historical data"
    }
  ]

  const stats = [
    { icon: <Users />, value: "5000+", label: "Bike Listings" },
    { icon: <Star />, value: "98%", label: "User Satisfaction" },
    { icon: <Shield />, value: "24/7", label: "Free Access" },
    { icon: <Clock />, value: "Instant", label: "Results" }
  ]

  const bikeTypes = [
    { name: "Sport Bikes", icon: "🏍️", color: "from-red-500 to-orange-500" },
    { name: "Scooters", icon: "🛵", color: "from-blue-500 to-cyan-500" },
    { name: "Cruisers", icon: "🏍️", color: "from-purple-500 to-pink-500" },
    { name: "Dirt Bikes", icon: "🏍️", color: "from-green-500 to-emerald-500" }
  ]

  const handleGetStarted = () => {
    router.push('/predict')
  }

  const handleLearnMore = () => {
    const element = document.getElementById('features')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg transform group-hover:rotate-12 transition-transform duration-300">
                <Bike className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                BikePriceLK
              </span>
            </div>
            
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Bike Image */}
      <div ref={heroRef} className="relative z-10 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`space-y-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-blue-100">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold text-gray-700">
                  Sri Lanka's #1 Bike Price Predictor
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Know Your Bike's
                </span>
                <br />
                <span className="text-gray-800 relative">
                  True Market Value
                  <div className="absolute -top-6 -right-12 animate-bounce">
                    <Gem className="w-8 h-8 text-yellow-500" />
                  </div>
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-600 leading-relaxed">
                Get instant, accurate price estimates for your bike using our 
                advanced machine learning model. Trusted by thousands of Sri Lankan 
                bike owners and dealers.
              </p>

              {/* Features Pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  "✓ AI-Powered",
                  "✓ Real Market Data",
                  "✓ Free Forever",
                  "✓ Instant Results"
                ].map((feature, index) => (
                  <span
                    key={index}
                    className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleGetStarted}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Predict Your Bike Price
                    <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center transform hover:scale-110 transition-all duration-300"
                  >
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Bike Image with Floating Icons */}
            <div className={`relative transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {/* Main Bike Image Container */}
              <div className="relative">
                {/* Floating Background Elements */}
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-pulse animation-delay-1000"></div>
                
                {/* Bike Image with Gradient Background */}
                <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
                  
                  {/* Your Bike Image */}
                  <Image
                    src={bikeImage}
                    alt="Bike Illustration"
                    width={350}
                    height={300}
                    className="w-full h-auto rounded-2xl"
                    priority
                  />

                  {/* Floating Icons - These will appear on top of your image */}
                  
                  {/* Top Right - Target Icon */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-xl animate-bounce">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  
                  {/* Bottom Left - Dollar Sign Icon */}
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-xl animate-bounce animation-delay-1000">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  
                  {/* Top Left - Zap Icon (adds more visual interest) */}
                  <div className="absolute -top-4 -left-4 bg-white rounded-full p-3 shadow-xl animate-bounce animation-delay-2000">
                    <Zap className="w-6 h-6 text-yellow-500" />
                  </div>
                  
                  {/* Bottom Right - Award Icon */}
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-xl animate-bounce animation-delay-1500">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  
                  {/* Center floating price tag */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 px-4 py-2 rounded-full shadow-xl animate-pulse">
                    <span className="font-bold text-gray-800">Rs ???</span>
                  </div>
                </div>
              </div>

              {/* Bike Type Icons Below Image */}
              <div className="flex justify-center gap-4 mt-8">
                {bikeTypes.map((type, index) => (
                  <div
                    key={index}
                    className="group relative cursor-pointer"
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <div className={`bg-gradient-to-r ${type.color} p-4 rounded-2xl shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
                      <span className="text-2xl filter drop-shadow-lg">{type.icon}</span>
                    </div>
                    {hoveredFeature === index && (
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                        {type.name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative z-10 py-20 mt-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose BikePriceLK?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine advanced machine learning with local market data to give you 
              the most accurate bike valuations in Sri Lanka.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setHoveredFeature(index + 10)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${hoveredFeature === index + 10 ? 'scale-110 rotate-6' : ''}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get your bike's estimated price in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "1",
                title: "Enter Bike Details",
                description: "Fill in your bike's brand, model, year, and other key specifications",
                icon: "📝"
              },
              {
                step: "2",
                title: "AI Analysis",
                description: "Our ML model analyzes thousands of similar bikes in our database",
                icon: "🤖"
              },
              {
                step: "3",
                title: "Get Instant Price",
                description: "Receive an accurate market price estimate in seconds",
                icon: "💰"
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl animate-pulse">
                    {item.step}
                  </div>
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-2 shadow-lg animate-pulse">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20 bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Bike's Value?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied users who trust BikePriceLK for accurate valuations
          </p>
          <button
            onClick={handleGetStarted}
            className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
          >
            Start Predicting Now
            <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4 group">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg transform group-hover:rotate-12 transition-transform">
                  <Bike className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-white text-lg">BikePriceLK</span>
              </div>
              <p className="text-sm text-gray-400">
                Sri Lanka's most accurate bike price prediction platform.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-blue-400 transition-colors">About Us</button></li>
                <li><button className="text-gray-400 hover:text-blue-400 transition-colors">How It Works</button></li>
                <li><button className="text-gray-400 hover:text-blue-400 transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</button></li>
                <li><button className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {/* Social icons would go here */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 BikePriceLK. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}