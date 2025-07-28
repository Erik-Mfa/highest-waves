import React, { useState } from 'react'
import { FaEnvelope, FaUser, FaMapMarkerAlt, FaCity, FaGlobe, FaMailBulk } from 'react-icons/fa'

const countryList = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'BR', name: 'Brazil' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'IE', name: 'Ireland' },
  { code: 'PT', name: 'Portugal' }
]

// eslint-disable-next-line react/prop-types
const BillingForm = ({ onBillingInfoChange }) => {
  const [billingInfo, setBillingInfo] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  })

  const [errors, setErrors] = useState({})

  const handleBillingChange = (e) => {
    const { name, value } = e.target
    const updatedInfo = { ...billingInfo, [name]: value }
    setBillingInfo(updatedInfo)
    onBillingInfoChange(updatedInfo)
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!billingInfo.email) {
      newErrors.email = 'Email is required.'
    } else if (!/\S+@\S+\.\S+/.test(billingInfo.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }
    if (!billingInfo.name) newErrors.name = 'Name is required.'
    if (!billingInfo.address) newErrors.address = 'Address is required.'
    if (!billingInfo.city) newErrors.city = 'City is required.'
    if (!billingInfo.country) newErrors.country = 'Country is required.'
    if (!billingInfo.postalCode)
      newErrors.postalCode = 'Postal code is required.'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length === 0) {
      // Proceed with submission
      console.log('Billing Info Submitted:', billingInfo)
      setErrors({})
    } else {
      setErrors(validationErrors)
    }
  }

  return (
    <div className="rounded-2xl bg-gray-800/90 border border-gray-700/50 p-8 shadow-2xl backdrop-blur-sm">
      {/* Header with gradient */}
      <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-gray-700/50">
        <div className="p-3 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-400/30">
          <FaUser className="text-2xl text-teal-400" />
        </div>
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Billing Information
          </h3>
          <p className="text-sm text-gray-400 mt-1">Secure payment details</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
            <FaEnvelope className={`text-lg transition-colors duration-300 ${errors.email ? 'text-red-400' : 'text-teal-400'}`} />
            <span>Email Address</span>
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className={`w-full rounded-xl border-2 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50 ${
                errors.email 
                  ? 'border-red-500 focus:border-red-400' 
                  : 'border-gray-600/50 focus:border-teal-400'
              }`}
              value={billingInfo.email}
              onChange={handleBillingChange}
            />
          </div>
          {errors.email && <p className="text-sm text-red-400 flex items-center space-x-1">
            <span>⚠️</span><span>{errors.email}</span>
          </p>}
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
            <FaUser className={`text-lg transition-colors duration-300 ${errors.name ? 'text-red-400' : 'text-teal-400'}`} />
            <span>Full Name</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className={`w-full rounded-xl border-2 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50 ${
                errors.name 
                  ? 'border-red-500 focus:border-red-400' 
                  : 'border-gray-600/50 focus:border-teal-400'
              }`}
              value={billingInfo.name}
              onChange={handleBillingChange}
            />
          </div>
          {errors.name && <p className="text-sm text-red-400 flex items-center space-x-1">
            <span>⚠️</span><span>{errors.name}</span>
          </p>}
        </div>

        {/* Address Field */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
            <FaMapMarkerAlt className={`text-lg transition-colors duration-300 ${errors.address ? 'text-red-400' : 'text-teal-400'}`} />
            <span>Street Address</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="address"
              placeholder="Enter your street address"
              className={`w-full rounded-xl border-2 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50 ${
                errors.address 
                  ? 'border-red-500 focus:border-red-400' 
                  : 'border-gray-600/50 focus:border-teal-400'
              }`}
              value={billingInfo.address}
              onChange={handleBillingChange}
            />
          </div>
          {errors.address && <p className="text-sm text-red-400 flex items-center space-x-1">
            <span>⚠️</span><span>{errors.address}</span>
          </p>}
        </div>

        {/* City and Postal Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
              <FaCity className={`text-lg transition-colors duration-300 ${errors.city ? 'text-red-400' : 'text-teal-400'}`} />
              <span>City</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                className={`w-full rounded-xl border-2 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50 ${
                  errors.city 
                    ? 'border-red-500 focus:border-red-400' 
                    : 'border-gray-600/50 focus:border-teal-400'
                }`}
                value={billingInfo.city}
                onChange={handleBillingChange}
              />
            </div>
            {errors.city && <p className="text-sm text-red-400 flex items-center space-x-1">
              <span>⚠️</span><span>{errors.city}</span>
            </p>}
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
              <FaMailBulk className={`text-lg transition-colors duration-300 ${errors.postalCode ? 'text-red-400' : 'text-teal-400'}`} />
              <span>Postal Code</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="postalCode"
                placeholder="Enter postal code"
                className={`w-full rounded-xl border-2 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50 ${
                  errors.postalCode 
                    ? 'border-red-500 focus:border-red-400' 
                    : 'border-gray-600/50 focus:border-teal-400'
                }`}
                value={billingInfo.postalCode}
                onChange={handleBillingChange}
              />
            </div>
            {errors.postalCode && <p className="text-sm text-red-400 flex items-center space-x-1">
              <span>⚠️</span><span>{errors.postalCode}</span>
            </p>}
          </div>
        </div>

        {/* Country Selection */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
            <FaGlobe className={`text-lg transition-colors duration-300 ${errors.country ? 'text-red-400' : 'text-teal-400'}`} />
            <span>Country</span>
          </label>
          <div className="relative">
            <select
              name="country"
              value={billingInfo.country}
              onChange={handleBillingChange}
              className={`w-full rounded-xl border-2 bg-gray-700/50 px-4 py-3 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50 ${
                errors.country 
                  ? 'border-red-500 focus:border-red-400' 
                  : 'border-gray-600/50 focus:border-teal-400'
              }`}
            >
              <option value="" className="bg-gray-800">Select Country</option>
              {countryList.map((country) => (
                <option key={country.code} value={country.code} className="bg-gray-800">
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          {errors.country && <p className="text-sm text-red-400 flex items-center space-x-1">
            <span>⚠️</span><span>{errors.country}</span>
          </p>}
        </div>

        {/* Security Badge */}
        <div className="mt-6 pt-4 border-t border-gray-700/50">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>🔒 Your information is encrypted and secure</span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default BillingForm
