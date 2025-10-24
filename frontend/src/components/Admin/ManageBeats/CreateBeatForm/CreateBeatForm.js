/* eslint-disable react/prop-types */
// CreateBeatForm.js
import React, { useState, useEffect } from 'react'
import { FaImage, FaVideo, FaChevronDown } from 'react-icons/fa'
import { getTags } from '../../../../services/api/tags'
import { createBeat } from '../../../../services/api/beats'
import UserRegisterError from '../../../Error/UserRegisterError/UserRegisterError' // Adjust import path

const CreateBeatForm = ({ formOpen }) => {
  const [beatDetails, setBeatDetails] = useState({
    title: '',
    description: '',
    price: '',
    bpm: '',
    tone: '',
    image: '',
    audioURL: '',
    owner: '',
    tags: []
  })
  const [tags, setTags] = useState([])
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false)
  const [imageName, setImageName] = useState('No file chosen')
  const [audioName, setAudioName] = useState('No file chosen')
  const [validationErrors, setValidationErrors] = useState({})
  const [isFormDropdownOpen, setIsFormDropdownOpen] = useState(false)

  const fetchTags = async () => {
    try {
      const tags = await getTags()
      setTags(tags)
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  const validateForm = () => {
    const errors = {}

    if (!beatDetails.title) errors.title = 'Title is required'
    if (!beatDetails.description) errors.description = 'Description is required'
    if (!beatDetails.price) errors.price = 'Price is required'
    if (!beatDetails.bpm) errors.bpm = 'BPM is required'
    if (!beatDetails.tone) errors.tone = 'Tone is required'
    if (!beatDetails.image) errors.image = 'Image is required'
    if (!beatDetails.audioURL) errors.audioURL = 'Audio file is required'

    setValidationErrors(errors)

    return Object.keys(errors).length === 0
  }

  const handleCreateBeat = async () => {
    if (!validateForm()) return // Prevent submission if there are validation errors

    try {
      const response = await createBeat(beatDetails)
      if (response.success) {
        setBeatDetails({
          title: '',
          description: '',
          price: '',
          bpm: '',
          tone: '',
          image: '',
          audioURL: '',
          owner: '',
          tags: []
        })
        setIsFormDropdownOpen(false)
      } else {
        console.error('Failed to create beat')
      }
    } catch (error) {
      console.error('Error creating beat:', error)
    }
  }

  const toggleTagsDropdown = () => {
    setIsTagsDropdownOpen(!isTagsDropdownOpen)
  }

  const handleTagSelect = (tagId) => {
    const newTags = beatDetails.tags.includes(tagId)
      ? beatDetails.tags.filter((id) => id !== tagId)
      : [...beatDetails.tags, tagId]

    setBeatDetails({ ...beatDetails, tags: newTags })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBeatDetails({ ...beatDetails, image: file })
      setImageName(file.name)
    }
  }

  const handleAudioChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBeatDetails({ ...beatDetails, audioURL: file })
      setAudioName(file.name)
    }
  }

  const toggleFormDropdown = () => {
    setIsFormDropdownOpen(!formOpen)
    setIsTagsDropdownOpen(false) // Ensure tags dropdown is closed when form dropdown is toggled
  }

  useEffect(() => {
    toggleFormDropdown()
  }, [formOpen])

  return (
    <div>
      {isFormDropdownOpen && (
        <form className="mx-auto mb-6 max-w-4xl bg-white border border-brand-gray-light rounded-xl shadow-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-brand-blue-dark to-brand-blue p-4">
            <h2 className="text-xl font-bold text-white">Create New Beat</h2>
            <p className="text-sm text-brand-gray-light opacity-90">Fill in the details for your new beat</p>
          </div>
          
          <div className="p-5 space-y-4">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-xs font-semibold text-brand-blue-dark mb-1"
              >
                Beat Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter beat title"
                value={beatDetails.title}
                onChange={(e) =>
                  setBeatDetails({ ...beatDetails, title: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-md transition-all duration-300 focus:outline-none focus:ring-2 text-sm ${
                  validationErrors.title 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-brand-gray-light focus:border-brand-blue focus:ring-brand-blue/20'
                } bg-white text-brand-blue-dark placeholder-brand-gray`}
              />
              {validationErrors.title && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-xs font-semibold text-brand-blue-dark mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter beat description"
                value={beatDetails.description}
                onChange={(e) =>
                  setBeatDetails({ ...beatDetails, description: e.target.value })
                }
                rows={3}
                className={`w-full px-3 py-2 border rounded-md transition-all duration-300 focus:outline-none focus:ring-2 resize-none text-sm ${
                  validationErrors.description 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-brand-gray-light focus:border-brand-blue focus:ring-brand-blue/20'
                } bg-white text-brand-blue-dark placeholder-brand-gray`}
              />
              {validationErrors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {validationErrors.description}
                </p>
              )}
            </div>

            {/* Price and BPM Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-xs font-semibold text-brand-blue-dark mb-1"
                >
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  placeholder="0.00"
                  value={beatDetails.price}
                  onChange={(e) =>
                    setBeatDetails({ ...beatDetails, price: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-md transition-all duration-300 focus:outline-none focus:ring-2 text-sm ${
                    validationErrors.price 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-brand-gray-light focus:border-brand-blue focus:ring-brand-blue/20'
                  } bg-white text-brand-blue-dark placeholder-brand-gray`}
                />
                {validationErrors.price && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.price}</p>
                )}
              </div>

              {/* BPM */}
              <div>
                <label
                  htmlFor="bpm"
                  className="block text-xs font-semibold text-brand-blue-dark mb-1"
                >
                  BPM
                </label>
                <input
                  type="text"
                  id="bpm"
                  placeholder="120"
                  value={beatDetails.bpm}
                  onChange={(e) =>
                    setBeatDetails({ ...beatDetails, bpm: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-md transition-all duration-300 focus:outline-none focus:ring-2 text-sm ${
                    validationErrors.bpm 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-brand-gray-light focus:border-brand-blue focus:ring-brand-blue/20'
                  } bg-white text-brand-blue-dark placeholder-brand-gray`}
                />
                {validationErrors.bpm && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.bpm}</p>
                )}
              </div>
            </div>

            {/* Tone */}
            <div>
              <label
                htmlFor="tone"
                className="block text-xs font-semibold text-brand-blue-dark mb-1"
              >
                Tone/Key
              </label>
              <input
                type="text"
                id="tone"
                placeholder="e.g., C Major, A Minor"
                value={beatDetails.tone}
                onChange={(e) =>
                  setBeatDetails({ ...beatDetails, tone: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-md transition-all duration-300 focus:outline-none focus:ring-2 text-sm ${
                  validationErrors.tone 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-brand-gray-light focus:border-brand-blue focus:ring-brand-blue/20'
                } bg-white text-brand-blue-dark placeholder-brand-gray`}
              />
              {validationErrors.tone && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.tone}</p>
              )}
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Image */}
              <div>
                <label className="block text-xs font-semibold text-brand-blue-dark mb-1">
                  Cover Image
                </label>
                <label className={`flex cursor-pointer items-center justify-center w-full px-3 py-4 border-2 border-dashed rounded-md transition-all duration-300 hover:border-brand-blue hover:bg-brand-gray-light/50 ${
                  validationErrors.image ? 'border-red-500' : 'border-brand-gray-light'
                }`}>
                  <div className="text-center">
                    <FaImage className="mx-auto h-6 w-6 text-brand-gray mb-1" />
                    <span className="text-xs text-brand-gray">
                      {imageName === 'No file chosen' ? 'Choose image file' : imageName}
                    </span>
                  </div>
                  <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
                {validationErrors.image && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.image}</p>
                )}
              </div>

              {/* Audio File */}
              <div>
                <label className="block text-xs font-semibold text-brand-blue-dark mb-1">
                  Audio File
                </label>
                <label className={`flex cursor-pointer items-center justify-center w-full px-3 py-4 border-2 border-dashed rounded-md transition-all duration-300 hover:border-brand-blue hover:bg-brand-gray-light/50 ${
                  validationErrors.audioURL ? 'border-red-500' : 'border-brand-gray-light'
                }`}>
                  <div className="text-center">
                    <FaVideo className="mx-auto h-6 w-6 text-brand-gray mb-1" />
                    <span className="text-xs text-brand-gray">
                      {audioName === 'No file chosen' ? 'Choose audio file' : audioName}
                    </span>
                  </div>
                  <input
                    type="file"
                    id="audioURL"
                    onChange={handleAudioChange}
                    className="hidden"
                    accept="audio/*"
                  />
                </label>
                {validationErrors.audioURL && (
                  <p className="text-sm text-red-500 mt-1">
                    {validationErrors.audioURL}
                  </p>
                )}
              </div>
            </div>

            {/* Tags Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-brand-blue-dark mb-1">
                Tags ({beatDetails.tags.length} selected)
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleTagsDropdown}
                  className="w-full px-3 py-2 border border-brand-gray-light rounded-md bg-white text-left text-brand-blue-dark text-sm transition-all duration-300 hover:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 flex items-center justify-between"
                >
                  <span>Select Tags</span>
                  <FaChevronDown className={`transition-transform duration-300 ${
                    isTagsDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                {isTagsDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border border-brand-gray-light bg-white shadow-xl max-h-40 overflow-y-auto">
                    {tags.map((tag) => (
                      <div
                        key={tag.id}
                        className={`cursor-pointer px-3 py-2 text-sm transition-colors duration-200 ${
                          beatDetails.tags.includes(tag.id)
                            ? 'bg-brand-blue text-white'
                            : 'text-brand-blue-dark hover:bg-brand-gray-light'
                        }`}
                        onClick={() => handleTagSelect(tag.id)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{tag.name}</span>
                          {beatDetails.tags.includes(tag.id) && (
                            <span className="text-xs">✓</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Create Beat Button */}
            <div className="pt-3 border-t border-brand-gray-light">
              <button
                type="button"
                onClick={handleCreateBeat}
                className="w-full bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white px-4 py-3 rounded-md font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Beat
              </button>
            </div>
          </div>

          {/* Form validation errors */}
          {Object.keys(validationErrors).length > 0 && (
            <div className="px-5 pb-4">
              <UserRegisterError message="Please fix the errors above and try again." />
            </div>
          )}
        </form>
      )}
    </div>
  )
}

export default CreateBeatForm
