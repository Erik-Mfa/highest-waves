import React, { useState } from 'react';

const BillingForm = ({ onBillingInfoChange }) => {
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  });

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    const updatedInfo = { ...billingInfo, [name]: value };
    setBillingInfo(updatedInfo);
    onBillingInfoChange(updatedInfo); // Pass updated billing info to parent
  };

  const countryList = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-white mb-2">Billing Information</h3>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="w-full p-3 mb-2 border border-gray-600 rounded-md bg-gray-700 text-white"
        value={billingInfo.name}
        onChange={handleBillingChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        className="w-full p-3 mb-2 border border-gray-600 rounded-md bg-gray-700 text-white"
        value={billingInfo.address}
        onChange={handleBillingChange}
      />
      <div className="flex space-x-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          className="w-1/2 p-3 mb-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          value={billingInfo.city}
          onChange={handleBillingChange}
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          className="w-1/2 p-3 mb-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          value={billingInfo.postalCode}
          onChange={handleBillingChange}
        />
      </div>
      <select
        name="country"
        value={billingInfo.country}
        onChange={handleBillingChange}
        className="w-full p-3 mb-2 border border-gray-600 rounded-md bg-gray-700 text-white"
      >
        <option value="">Select Country</option>
        {countryList.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BillingForm;
