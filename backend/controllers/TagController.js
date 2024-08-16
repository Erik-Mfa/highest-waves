const Tag = require('../models/Tag');

class TagController {
  async find(req, res) {
    try {
      const tags = await Tag.find();
      res.status(200).json(tags);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  async findById(req, res) {
    try {
      const tagId = req.params.id;
      
      const tag = await Tag.findOne({ id: tagId });
      if (!tag) return res.status(404).json({ message: 'Tag not found' });
      res.status(200).json(tag);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  async save(req, res) {
    try {
      const { name } = req.body;

      const existingTag = await Tag.findOne({ name });
      if (existingTag) return res.status(400).json({ message: 'Tag already exists' });

      const id = req.params.id;

      const max = await Tag.findOne({}).sort({ id: -1 });
      const newId = max ? max.id + 1 : 1;

      const tag = new Tag({ id: newId, name });
      const newTag = await tag.save();
      res.status(201).json(newTag);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const { name } = req.body;
      const id = req.params.id

      const tag = await Tag.findOne({ id });
      if (!tag) return res.status(404).json({ message: 'Tag not found' });

      tag.name = name || tag.name;

      const updatedTag = await tag.save();
      res.status(200).json(updatedTag);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id

      const tag = await Tag.findOne({ id });
      if (!tag) return res.status(404).json({ message: 'Tag not found' });

      await Tag.findOneAndDelete({ id });
      res.status(200).json({ message: 'Tag deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new TagController();
