/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const Beat = require('../models/Beat')
const Tag = require('../models/Tag')
const License = require('../models/License')
const User = require('../models/User')
const fs = require('fs')
const path = require('path')

class BeatController {
  async find(req, res) {
    try {
      console.log('Finding all beats')

      const beats = await Beat.find()
        .populate({
          path: 'owner',
          model: 'User'
        })
        .populate({
          path: 'tags',
          model: 'Tag'
        })
        .populate({
          path: 'licenses',
          model: 'License',
          select: 'id name description basePrice streamLimit videoClipLimit publishingRoyalty masterRoyalty isExclusive terms icon'
        })

      console.log('Found beats:', beats.length)
      console.log('Sample beat licenses:', beats[0]?.licenses)

      res.status(200).json(beats)
    } catch (err) {
      console.error('Error in find:', err)
      res.status(500).json({ message: err.message })
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id
      console.log('Finding beat with id:', id)

      // First find the beat
      let beat = await Beat.findOne({ id })
      if (!beat) {
        console.log('Beat not found')
        return res.status(404).json({ message: 'Beat not found' })
      }

      // If beat has no licenses, try to update them
      if (!beat.licenses || beat.licenses.length === 0) {
        console.log('Beat has no licenses, updating...')
        const licenses = await License.find()
        if (licenses && licenses.length > 0) {
          beat.licenses = licenses.map(license => license._id)
          beat = await beat.save()
          console.log('Updated beat with licenses:', beat.licenses)
        }
      }

      // Now populate all fields
      const populatedBeat = await Beat.findOne({ id })
        .populate({
          path: 'owner',
          model: 'User'
        })
        .populate({
          path: 'tags',
          model: 'Tag'
        })
        .populate({
          path: 'licenses',
          model: 'License',
          select: 'id name description basePrice streamLimit videoClipLimit publishingRoyalty masterRoyalty isExclusive terms icon'
        })

      res.status(200).json(populatedBeat)
    } catch (err) {
      console.error('Error in findById:', err)
      res.status(500).json({ message: err.message })
    }
  }

  async save(req, res) {
    try {
      const {
        title,
        description,
        bpm,
        tone,
        image,
        audioURL,
        owner,
        tags
      } = req.body

      const maxBeat = await Beat.findOne({}).sort({ id: -1 })
      const newId = maxBeat ? maxBeat.id + 1 : 1

      const user = await User.findOne({ id: owner })
      if (!user) return res.status(400).json({ message: 'Invalid owner' })

      const tag = await Tag.find({ id: tags })
      if (!tag) return res.status(400).json({ message: 'Invalid tags' })

      // Get all available licenses
      const licenses = await License.find()
      if (!licenses || licenses.length === 0) {
        return res.status(400).json({ message: 'No licenses available' })
      }

      // Prepend "assets/" to the filenames
      const imageFile = req.files['image']
        ? `assets/beats-logos/${req.files['image'][0].filename}`
        : null
      const audioFile = req.files['audioURL']
        ? `assets/beats-audios/${req.files['audioURL'][0].filename}`
        : null

      const beat = new Beat({
        id: newId,
        title,
        description,
        bpm,
        tone,
        image: imageFile,
        audioURL: audioFile,
        owner: user,
        tags: tag,
        licenses: licenses // Add all licenses to the beat
      })

      const result = await beat.save()
      res.status(201).json({ success: true })
    } catch (err) {
      console.error(err)
      res.status(400).json({ message: err.message })
    }
  }

  async update(req, res) {
    try {
      const { title, description, image, audioURL, owner, tags } = req.body

      const id = req.params.id
      const beat = await Beat.findOne({ id })
      if (!beat) return res.status(404).json({ message: 'Beat not found' })

      const user = await User.findOne({ id: owner })
      if (!user) return res.status(400).json({ message: 'Invalid owner' })

      const tag = await Tag.find({ id: tags })
      if (!tag) return res.status(400).json({ message: 'Invalid tags' })

      // Get all available licenses if beat doesn't have any
      if (!beat.licenses || beat.licenses.length === 0) {
        const licenses = await License.find()
        if (licenses && licenses.length > 0) {
          beat.licenses = licenses
        }
      }
        
      beat.title = title || beat.title
      beat.description = description || beat.description
      beat.image = req.file ? req.file.path : beat.image
      beat.audioURL = audioURL || beat.audioURL
      beat.owner = user
      beat.tags = tag

      const updatedBeat = await beat.save()
      res.status(200).json(updatedBeat)
    } catch (err) {
      console.error(err)
      res.status(400).json({ message: err.message })
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id
      const beat = await Beat.findOne({ id })
      if (!beat) return res.status(404).json({ message: 'Beat not found' })

      // Construct the full paths to the image and audio files
      const imageFilePath = path.join(
        __dirname,
        '../public/assets/beats-logos',
        path.basename(beat.image)
      )
      const audioFilePath = path.join(
        __dirname,
        '../public/assets/beats-audios',
        path.basename(beat.audioURL)
      )

      if (fs.existsSync(imageFilePath)) {
        fs.unlinkSync(imageFilePath)
      }

      if (fs.existsSync(audioFilePath)) {
        fs.unlinkSync(audioFilePath)
      }

      // Delete the Beat record from the database
      await Beat.findByIdAndDelete(beat._id)

      res.status(200).json({ message: 'Beat and associated files deleted' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = new BeatController()
