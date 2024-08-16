const Beat = require('../models/Beat');
const Tag = require('../models/Tag');
const User = require('../models/User'); 

class BeatController {
  
  async find(req, res) {
    try {
      const beats = await Beat.find().populate('owner').populate('tags'); // Populate owner and tags
      res.status(200).json(beats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id

      const beat = await Beat.findOne({id}).populate('owner').populate('tags');
      if (!beat) return res.status(404).json({ message: 'Beat not found' });
      res.status(200).json(beat);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  async save(req, res) {
    try {
      const { title, description, price, bpm, tone, image, audioURL, owner, tags } = req.body;

      const maxBeat = await Beat.findOne({}).sort({ id: -1 });
      const newId = maxBeat ? maxBeat.id + 1 : 1;

      const user = await User.findOne({id: owner});
      if (!user) return res.status(400).json({ message: 'Invalid owner' });

      const tag = await Tag.find({id: tags});
      if (!tag) return res.status(400).json({ message: 'Invalid tags' });

      const beat = new Beat({
        id: newId,
        title,
        description,
        price,
        bpm,
        tone,
        image,
        audioURL,
        owner: user,
        tags: tag
      });

      const result = await beat.save();
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const { title, description, price, image, audioURL, owner, tags } = req.body;

      const id = req.params.id;
      const beat = await Beat.findOne({ id });
      if (!beat) return res.status(404).json({ message: 'Beat not found' });

      const user = await User.findOne({id: owner});
      if (!user) return res.status(400).json({ message: 'Invalid owner' });
    
      const tag = await Tag.find({id: tags});
      if (!tag) return res.status(400).json({ message: 'Invalid tags' });
      
      beat.title = title || beat.title;
      beat.description = description || beat.description;
      beat.price = price || beat.price;
      beat.image = req.file ? req.file.path : beat.image; 
      beat.audioURL = audioURL || beat.audioURL;
      beat.owner = user;
      beat.tags = tag; 
      
      const updatedBeat = await beat.save();
      res.status(200).json(updatedBeat);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const beat = await Beat.findOne({ id });
      if (!beat) return res.status(404).json({ message: 'Beat not found' });

      await Beat.findByIdAndDelete(beat._id);
      res.status(200).json({ message: 'Beat deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
  }

module.exports = new BeatController();
