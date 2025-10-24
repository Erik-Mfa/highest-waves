import React, { useState, useEffect } from 'react'
import { getLicenses, updateLicense, createLicense, deleteLicense } from '../../../services/api/licenses'
import { FaTrash, FaEdit, FaSave, FaTimes, FaGem, FaCrown, FaStar, FaMedal, FaPlus } from 'react-icons/fa'

const ManageLicenses = () => {
  const [licenses, setLicenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingLicense, setEditingLicense] = useState(null)
  const [licenseFormData, setLicenseFormData] = useState({})
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [createFormData, setCreateFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    streamLimit: '',
    videoClipLimit: '',
    publishingRoyalty: '',
    masterRoyalty: '',
    isExclusive: false,
    terms: '',
    icon: 'gold'
  })

  const fetchLicenses = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('Fetching licenses...')
      const data = await getLicenses()
      console.log('Licenses fetched:', data)
      setLicenses(data || [])
    } catch (error) {
      console.error('Error fetching licenses:', error)
      setError('Failed to fetch licenses. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLicenses()
  }, [])

  // License editing functions
  const handleEditLicense = (license) => {
    console.log('Editing license:', license)
    console.log('License ID:', license.id)
    setEditingLicense(license.id)
    setLicenseFormData({ ...license })
  }

  const handleCancelEdit = () => {
    setEditingLicense(null)
    setLicenseFormData({})
  }

  const handleSaveLicense = async () => {
    try {
      console.log('Updating license ID:', editingLicense)
      console.log('License data:', licenseFormData)
      await updateLicense(editingLicense, licenseFormData)
      setEditingLicense(null)
      setLicenseFormData({})
      fetchLicenses()
      alert('License updated successfully! Changes will apply to all beats using this license.')
    } catch (error) {
      console.error('Error updating license:', error)
      console.error('License ID:', editingLicense)
      console.error('License data:', licenseFormData)
      alert(`Failed to update license. Error: ${error.message}`)
    }
  }

  const handleLicenseInputChange = (field, value) => {
    setLicenseFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCreateInputChange = (field, value) => {
    setCreateFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCreateLicense = async () => {
    try {
      await createLicense(createFormData)
      setShowCreateForm(false)
      setCreateFormData({
        name: '',
        description: '',
        basePrice: '',
        streamLimit: '',
        videoClipLimit: '',
        publishingRoyalty: '',
        masterRoyalty: '',
        isExclusive: false,
        terms: '',
        icon: 'gold'
      })
      fetchLicenses()
      alert('License created successfully!')
    } catch (error) {
      console.error('Error creating license:', error)
      alert('Failed to create license. Please try again.')
    }
  }

  const handleDeleteLicense = async (licenseId) => {
    if (window.confirm('Are you sure you want to delete this license? This will affect all beats using this license.')) {
      try {
        await deleteLicense(licenseId)
        fetchLicenses()
        alert('License deleted successfully!')
      } catch (error) {
        console.error('Error deleting license:', error)
        alert('Failed to delete license. Please try again.')
      }
    }
  }

  // License icon mapping
  const getLicenseIcon = (iconType) => {
    const iconMap = {
      gold: <FaMedal className="text-yellow-400 text-2xl" />,
      platinum: <FaStar className="text-slate-400 text-2xl" />,
      diamond: <FaGem className="text-brand-blue text-2xl" />,
      exclusive: <FaCrown className="text-purple-400 text-2xl" />
    }
    return iconMap[iconType] || <FaMedal className="text-yellow-400 text-2xl" />
  }

  return (
    <div className="m-4 md:m-10 rounded-xl bg-white shadow-xl">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-t-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Licenses</h1>
            <p className="text-brand-gray-light opacity-90">Global license management - changes affect all beats ({licenses.length} licenses)</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-white text-brand-blue px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30 flex items-center space-x-2"
          >
            <FaPlus className="w-4 h-4" />
            <span>Create License</span>
          </button>
        </div>
      </div>

      <div className="p-8">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="text-brand-blue text-lg">Loading licenses...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
            <button 
              onClick={fetchLicenses}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        )}

        {/* Create License Form */}
        {showCreateForm && (
          <div className="mb-8 bg-gradient-to-r from-brand-blue/5 to-brand-blue-dark/5 rounded-xl p-6 border border-brand-blue/20">
            <h2 className="text-xl font-bold text-brand-blue-dark mb-4">Create New License</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-brand-blue-dark mb-2">License Name</label>
                <input
                  type="text"
                  value={createFormData.name}
                  onChange={(e) => handleCreateInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-brand-gray-light rounded text-brand-blue-dark"
                  placeholder="e.g., Basic License"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-blue-dark mb-2">Price ($)</label>
                <input
                  type="number"
                  value={createFormData.basePrice}
                  onChange={(e) => handleCreateInputChange('basePrice', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-brand-gray-light rounded text-brand-blue-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-blue-dark mb-2">Icon Type</label>
                <select
                  value={createFormData.icon}
                  onChange={(e) => handleCreateInputChange('icon', e.target.value)}
                  className="w-full px-3 py-2 border border-brand-gray-light rounded text-brand-blue-dark"
                >
                  <option value="gold">Gold (Medal)</option>
                  <option value="platinum">Platinum (Star)</option>
                  <option value="diamond">Diamond (Gem)</option>
                  <option value="exclusive">Exclusive (Crown)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-blue-dark mb-2">Stream Limit</label>
                <input
                  type="number"
                  value={createFormData.streamLimit}
                  onChange={(e) => handleCreateInputChange('streamLimit', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-brand-gray-light rounded text-brand-blue-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-blue-dark mb-2">Video Limit</label>
                <input
                  type="number"
                  value={createFormData.videoClipLimit}
                  onChange={(e) => handleCreateInputChange('videoClipLimit', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-brand-gray-light rounded text-brand-blue-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-blue-dark mb-2">Publishing Royalty (%)</label>
                <input
                  type="number"
                  value={createFormData.publishingRoyalty}
                  onChange={(e) => handleCreateInputChange('publishingRoyalty', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-brand-gray-light rounded text-brand-blue-dark"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-brand-blue-dark mb-2">Description</label>
                <input
                  type="text"
                  value={createFormData.description}
                  onChange={(e) => handleCreateInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-brand-gray-light rounded text-brand-blue-dark"
                  placeholder="Brief description of the license"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isExclusive"
                  checked={createFormData.isExclusive}
                  onChange={(e) => handleCreateInputChange('isExclusive', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="isExclusive" className="text-sm font-semibold text-brand-blue-dark">Exclusive License</label>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 border border-brand-gray-light text-brand-blue-dark rounded-lg hover:bg-brand-gray-light transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateLicense}
                className="px-6 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors duration-300"
              >
                Create License
              </button>
            </div>
          </div>
        )}

        {/* Licenses List */}
        {!loading && !error && licenses.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 text-brand-gray">📄</div>
            <h3 className="text-xl font-semibold text-brand-blue mb-2">No licenses yet</h3>
            <p className="text-brand-gray">Create your first license to get started</p>
          </div>
        ) : !loading && !error ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {licenses.map((license) => (
              <div
                key={license.id}
                className="bg-white border border-brand-gray-light rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getLicenseIcon(license.icon)}
                    <div>
                      <h3 className="text-lg font-bold text-brand-blue-dark">{license.name}</h3>
                      <p className="text-sm text-brand-blue">{license.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {editingLicense === license.id ? (
                      <>
                        <button
                          onClick={handleSaveLicense}
                          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-300"
                        >
                          <FaSave className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 transition-colors duration-300"
                        >
                          <FaTimes className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditLicense(license)}
                          className="bg-brand-blue text-white p-2 rounded-full hover:bg-brand-blue-dark transition-colors duration-300"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLicense(license.id)}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {editingLicense === license.id ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-brand-blue-dark mb-1">Price ($)</label>
                      <input
                        type="number"
                        value={licenseFormData.basePrice || ''}
                        onChange={(e) => handleLicenseInputChange('basePrice', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-brand-gray-light rounded text-brand-blue-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-blue-dark mb-1">Stream Limit</label>
                      <input
                        type="number"
                        value={licenseFormData.streamLimit || ''}
                        onChange={(e) => handleLicenseInputChange('streamLimit', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-brand-gray-light rounded text-brand-blue-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-blue-dark mb-1">Video Limit</label>
                      <input
                        type="number"
                        value={licenseFormData.videoClipLimit || ''}
                        onChange={(e) => handleLicenseInputChange('videoClipLimit', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-brand-gray-light rounded text-brand-blue-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-blue-dark mb-1">Publishing Royalty (%)</label>
                      <input
                        type="number"
                        value={licenseFormData.publishingRoyalty || ''}
                        onChange={(e) => handleLicenseInputChange('publishingRoyalty', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-brand-gray-light rounded text-brand-blue-dark"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-brand-blue-dark mb-1">Description</label>
                      <input
                        type="text"
                        value={licenseFormData.description || ''}
                        onChange={(e) => handleLicenseInputChange('description', e.target.value)}
                        className="w-full px-3 py-2 border border-brand-gray-light rounded text-brand-blue-dark"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={licenseFormData.isExclusive || false}
                        onChange={(e) => handleLicenseInputChange('isExclusive', e.target.checked)}
                        className="mr-2"
                      />
                      <label className="text-sm font-semibold text-brand-blue-dark">Exclusive License</label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-brand-blue/5 rounded-lg">
                      <span className="font-semibold text-brand-blue-dark">Price</span>
                      <span className="text-2xl font-bold text-brand-blue">${license.basePrice}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-brand-blue-dark">Streams:</span>
                        <span className="font-semibold text-brand-blue">{license.streamLimit?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-blue-dark">Videos:</span>
                        <span className="font-semibold text-brand-blue">{license.videoClipLimit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-blue-dark">Publishing:</span>
                        <span className="font-semibold text-brand-blue">{license.publishingRoyalty}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-blue-dark">Exclusive:</span>
                        <span className="font-semibold text-brand-blue">{license.isExclusive ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ManageLicenses
