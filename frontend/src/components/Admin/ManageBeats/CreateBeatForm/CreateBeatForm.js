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
        <form className="mx-12 mb-8 mt-6 rounded-lg bg-gray-800 py-10">
          {/* Title */}
          <div className="mx-10 mb-8">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter beat title"
              value={beatDetails.title}
              onChange={(e) =>
                setBeatDetails({ ...beatDetails, title: e.target.value })
              }
              className={`mt-1 block w-full border px-4 py-2 ${validationErrors.title ? 'border-red-500' : 'border-gray-600'} rounded-md bg-gray-900 text-white shadow-sm transition-transform duration-300 hover:scale-105 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm`}
            />
            {validationErrors.title && (
              <p className="text-sm text-red-500">{validationErrors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="mx-10 mb-8">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-white"
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
              className={`mt-1 block w-full border px-4 py-2 ${validationErrors.description ? 'border-red-500' : 'border-gray-600'} rounded-md bg-gray-900 text-white shadow-sm transition-transform duration-300 hover:scale-105 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm`}
            />
            {validationErrors.description && (
              <p className="text-sm text-red-500">
                {validationErrors.description}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="mx-10 mb-8">
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-white"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter beat price"
              value={beatDetails.price}
              onChange={(e) =>
                setBeatDetails({ ...beatDetails, price: e.target.value })
              }
              className={`mt-1 block w-full border px-4 py-2 ${validationErrors.price ? 'border-red-500' : 'border-gray-600'} rounded-md bg-gray-900 text-white shadow-sm transition-transform duration-300 hover:scale-105 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm`}
            />
            {validationErrors.price && (
              <p className="text-sm text-red-500">{validationErrors.price}</p>
            )}
          </div>

          {/* BPM */}
          <div className="mx-10 mb-8">
            <label
              htmlFor="bpm"
              className="mb-2 block text-sm font-medium text-white"
            >
              BPM
            </label>
            <input
              type="text"
              id="bpm"
              placeholder="Enter BPM"
              value={beatDetails.bpm}
              onChange={(e) =>
                setBeatDetails({ ...beatDetails, bpm: e.target.value })
              }
              className={`mt-1 block w-full border px-4 py-2 ${validationErrors.bpm ? 'border-red-500' : 'border-gray-600'} rounded-md bg-gray-900 text-white shadow-sm transition-transform duration-300 hover:scale-105 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm`}
            />
            {validationErrors.bpm && (
              <p className="text-sm text-red-500">{validationErrors.bpm}</p>
            )}
          </div>

          {/* Tone */}
          <div className="mx-10 mb-8">
            <label
              htmlFor="tone"
              className="mb-2 block text-sm font-medium text-white"
            >
              Tone
            </label>
            <input
              type="text"
              id="tone"
              placeholder="Enter tone"
              value={beatDetails.tone}
              onChange={(e) =>
                setBeatDetails({ ...beatDetails, tone: e.target.value })
              }
              className={`mt-1 block w-full border px-4 py-2 ${validationErrors.tone ? 'border-red-500' : 'border-gray-600'} rounded-md bg-gray-900 text-white shadow-sm transition-transform duration-300 hover:scale-105 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm`}
            />
            {validationErrors.tone && (
              <p className="text-sm text-red-500">{validationErrors.tone}</p>
            )}
          </div>

          <div className="flex justify-center">
            {/* Image */}
            <div className="mx-10 mb-8">
              <label
                htmlFor="image"
                className="block p-2 text-center text-sm font-medium text-white"
              >
                Image
              </label>
              <div className="flex items-center">
                <label className="flex cursor-pointer items-center rounded-md bg-gray-700 px-3 py-2 shadow-sm hover:bg-gray-600">
                  <FaImage className="mr-2" />
                  <span>{imageName}</span>
                  <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
              {validationErrors.image && (
                <p className="text-sm text-red-500">{validationErrors.image}</p>
              )}
            </div>

            {/* Audio File */}
            <div className="mx-10 mb-8">
              <label
                htmlFor="audioURL"
                className="block p-2 text-center text-sm font-medium text-white"
              >
                Audio
              </label>
              <div className="flex items-center">
                <label className="flex cursor-pointer items-center rounded-md bg-gray-700 px-3 py-2 shadow-sm hover:bg-gray-600">
                  <FaVideo className="mr-2" />
                  <span>{audioName}</span>
                  <input
                    type="file"
                    id="audioURL"
                    onChange={handleAudioChange}
                    className="hidden"
                    accept="audio/*"
                  />
                </label>
              </div>
              {validationErrors.audioURL && (
                <p className="text-sm text-red-500">
                  {validationErrors.audioURL}
                </p>
              )}
            </div>
          </div>

          {/* Tags Dropdown */}
          <div className="mx-10 mb-8">
            <label
              htmlFor="tags"
              className="mb-2 block text-sm font-medium text-white"
            >
              Tags
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={toggleTagsDropdown}
                className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-left text-white shadow-sm hover:bg-gray-800"
              >
                Select Tags <FaChevronDown className="ml-2 inline-block" />
              </button>
              {isTagsDropdownOpen && (
                <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-600 bg-gray-900 shadow-lg">
                  {tags.map((tag) => (
                    <div
                      key={tag.id}
                      className={`cursor-pointer px-4 py-2 ${
                        beatDetails.tags.includes(tag.id)
                          ? 'bg-cyan-600 text-white'
                          : 'text-white hover:bg-gray-800'
                      }`}
                      onClick={() => handleTagSelect(tag.id)}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Create Beat */}
          <div className="mx-10 mb-8">
            <button
              type="button"
              onClick={handleCreateBeat}
              className="w-full rounded-md border border-transparent bg-cyan-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:bg-cyan-700"
            >
              Create Beat
            </button>
          </div>

          {/* Form validation errors */}
          {Object.keys(validationErrors).length > 0 && (
            <UserRegisterError message="Please fix the errors above and try again." />
          )}
        </form>
      )}
    </div>
  )
}

export default CreateBeatForm
