const express = require('express');
const router = express.Router();
const BeatController = require('../controllers/BeatController.js');
const { authorize, isAdmin } = require('../services/auth/auth');


router.get('/', BeatController.find);
router.get('/:id', BeatController.findById);
router.post('/', authorize, BeatController.save); // Protected route
router.put('/:id', authorize, BeatController.update); // Protected route
router.delete('/:id', authorize, BeatController.delete); // Protected route

module.exports = router;