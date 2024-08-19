const express = require('express');
const router = express.Router();
const BeatController = require('../controllers/BeatController.js');
const { authorize, isAdmin } = require('../services/auth/auth');
const upload = require('../services/multer');


router.get('/', BeatController.find);
router.get('/:id', BeatController.findById);
router.post('/', upload.fields([{name: 'image', maxCount: 1},{name: 'audioURL', maxCount: 1}]), authorize, BeatController.save); // Protected route
router.put('/:id', authorize, BeatController.update); // Protected route
router.delete('/:id', authorize, BeatController.delete); // Protected route

module.exports = router;