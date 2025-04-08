/* eslint-disable no-unused-vars */
const License = require('../models/License')

class LicenseController {
  async find(req, res) {
    try {
      const licenses = await License.find()
      res.status(200).json(licenses)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: err.message })
    }
  }

  async findById(req, res) {
    try {
      const licenseId = req.params.id

      const license = await License.findOne({ id: licenseId })
      if (!license) return res.status(404).json({ message: 'License not found' })
      res.status(200).json(license)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: err.message })
    }
  }

  async save(req, res) {
    try {
      const { 
        name, 
        description, 
        basePrice, 
        streamLimit, 
        videoClipLimit, 
        publishingRoyalty, 
        masterRoyalty, 
        isExclusive, 
        terms, 
        icon 
      } = req.body

      const existingLicense = await License.findOne({ name })
      if (existingLicense)
        return res.status(400).json({ message: 'License already exists' })

      const max = await License.findOne({}).sort({ id: -1 })
      const newId = max == null ? 1 : max.id + 1

      const license = new License({ 
        id: newId, 
        name, 
        description, 
        basePrice, 
        streamLimit, 
        videoClipLimit, 
        publishingRoyalty, 
        masterRoyalty, 
        isExclusive, 
        terms, 
        icon 
      })
      const newLicense = await license.save()
      res.status(201).json({ success: true })
    } catch (err) {
      console.error(err)
      res.status(400).json({ message: err.message })
    }
  }

  async update(req, res) {
    try {
      const { 
        name, 
        description, 
        basePrice, 
        streamLimit, 
        videoClipLimit, 
        publishingRoyalty, 
        masterRoyalty, 
        isExclusive, 
        terms, 
        icon 
      } = req.body
      const id = req.params.id

      const license = await License.findOne({ id })
      if (!license) return res.status(404).json({ message: 'License not found' })

      license.name = name || license.name
      license.description = description || license.description
      license.basePrice = basePrice || license.basePrice
      license.streamLimit = streamLimit || license.streamLimit
      license.videoClipLimit = videoClipLimit || license.videoClipLimit
      license.publishingRoyalty = publishingRoyalty || license.publishingRoyalty
      license.masterRoyalty = masterRoyalty || license.masterRoyalty
      license.isExclusive = isExclusive !== undefined ? isExclusive : license.isExclusive
      license.terms = terms || license.terms
      license.icon = icon || license.icon

      const updatedLicense = await license.save()
      res.status(200).json(updatedLicense)
    } catch (err) {
      console.error(err)
      res.status(400).json({ message: err.message })
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id

      const license = await License.findOne({ id })
      if (!license) return res.status(404).json({ message: 'License not found' })

      await License.findOneAndDelete({ id })
      res.status(200).json({ message: 'License deleted' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = new LicenseController()
