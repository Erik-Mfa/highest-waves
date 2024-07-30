const Beat = require('../models/Beat');
const User = require('../models/User'); // Assuming beats are owned by users

class BeatController {
  // Get all beats
  async find(req, res) {
    try {
      const beats = await Beat.find().populate('owner'); // Populate owner to get user details
      res.status(200).json(beats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Get a beat by ID
  async findById(req, res) {
    try {
      const beat = await Beat.findById(req.params.id).populate('owner');
      if (!beat) return res.status(404).json({ message: 'Beat not found' });
      res.status(200).json(beat);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Create a new beat
  async save(req, res) {
    try {
      const { title, description, price, audioURL, owner } = req.body;

      // Check if owner is valid (optional)
      const user = await User.findById(owner);
      if (!user) return res.status(400).json({ message: 'Invalid owner' });

      // Get the next beat ID
      const maxBeat = await Beat.findOne({}).sort({ id: -1 });
      const newId = maxBeat ? maxBeat.id + 1 : 1;

      const beat = new Beat({
        id: newId,
        title,
        description,
        price,
        image: req.file ? req.file.path : '', // Handle file upload
        audioURL,
        owner
      });

      const newBeat = await beat.save();
      res.status(201).json(newBeat);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  // Update a beat by ID
  async update(req, res) {
    try {
      const { title, description, price, image, audioURL, owner } = req.body;

      const beat = await Beat.findById(req.params.id);
      if (!beat) return res.status(404).json({ message: 'Beat not found' });

      beat.title = title || beat.title;
      beat.description = description || beat.description;
      beat.price = price || beat.price;
      beat.image = req.file ? req.file.path : beat.image; // Handle file upload
      beat.audioURL = audioURL || beat.audioURL;
      beat.owner = owner || beat.owner;

      const updatedBeat = await beat.save();
      res.status(200).json(updatedBeat);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  // Delete a beat by ID
  async delete(req, res) {
    try {
      const beat = await Beat.findByIdAndDelete(req.params.id);
      if (!beat) return res.status(404).json({ message: 'Beat not found' });
      res.status(200).json({ message: 'Beat deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new BeatController();
