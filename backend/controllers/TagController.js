// ./controllers/TagController.js
const Tag = require('../models/Tag');

class TagController {
  // Get all tags
  async find(req, res) {
    try {
      const tags = await Tag.find();
      res.status(200).json(tags);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Get a tag by ID
  async findById(req, res) {
    try {
      const tag = await Tag.findById(req.params.id);
      if (!tag) return res.status(404).json({ message: 'Tag not found' });
      res.status(200).json(tag);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Create a new tag
  async save(req, res) {
    try {
      const { name } = req.body;

      // Check if tag with this name already exists
      const existingTag = await Tag.findOne({ name });
      if (existingTag) return res.status(400).json({ message: 'Tag already exists' });

      const tag = new Tag({ name });
      const newTag = await tag.save();
      res.status(201).json(newTag);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  // Update a tag by ID
  async update(req, res) {
    try {
      const { name } = req.body;

      const tag = await Tag.findById(req.params.id);
      if (!tag) return res.status(404).json({ message: 'Tag not found' });

      tag.name = name || tag.name;

      const updatedTag = await tag.save();
      res.status(200).json(updatedTag);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  // Delete a tag by ID
  async delete(req, res) {
    try {
      const tag = await Tag.findByIdAndDelete(req.params.id);
      if (!tag) return res.status(404).json({ message: 'Tag not found' });
      res.status(200).json({ message: 'Tag deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new TagController();
