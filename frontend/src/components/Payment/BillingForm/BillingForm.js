import React, { useState } from 'react'

const countryList = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'BR', name: 'Brazil' }
]

// eslint-disable-next-line react/prop-types
const BillingForm = ({ onBillingInfoChange }) => {
  const [billingInfo, setBillingInfo] = useState({
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
  }

  const validateForm = () => {
    const newErrors = {}
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
    <form
      onSubmit={handleSubmit}
      className="rounded-lg bg-gray-800 p-6 shadow-md"
    >
      <h3 className="mb-2 text-xl font-bold text-white">Billing Information</h3>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className={`mb-2 w-full border p-3 ${errors.name ? 'border-red-600' : 'border-gray-600'} rounded-md bg-gray-700 text-white`}
        value={billingInfo.name}
        onChange={handleBillingChange}
      />
      {errors.name && <p className="text-red-600">{errors.name}</p>}

      <input
        type="text"
        name="address"
        placeholder="Address"
        className={`mb-2 w-full border p-3 ${errors.address ? 'border-red-600' : 'border-gray-600'} rounded-md bg-gray-700 text-white`}
        value={billingInfo.address}
        onChange={handleBillingChange}
      />
      {errors.address && <p className="text-red-600">{errors.address}</p>}

      <div className="flex space-x-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          className={`mb-2 w-1/2 border p-3 ${errors.city ? 'border-red-600' : 'border-gray-600'} rounded-md bg-gray-700 text-white`}
          value={billingInfo.city}
          onChange={handleBillingChange}
        />
        {errors.city && <p className="text-red-600">{errors.city}</p>}

        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          className={`mb-2 w-1/2 border p-3 ${errors.postalCode ? 'border-red-600' : 'border-gray-600'} rounded-md bg-gray-700 text-white`}
          value={billingInfo.postalCode}
          onChange={handleBillingChange}
        />
        {errors.postalCode && (
          <p className="text-red-600">{errors.postalCode}</p>
        )}
      </div>

      <select
        name="country"
        value={billingInfo.country}
        onChange={handleBillingChange}
        className={`mb-2 w-full border p-3 ${errors.country ? 'border-red-600' : 'border-gray-600'} rounded-md bg-gray-700 text-white`}
      >
        <option value="">Select Country</option>
        {countryList.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      {errors.country && <p className="text-red-600">{errors.country}</p>}
    </form>
  )
}

export default BillingForm
