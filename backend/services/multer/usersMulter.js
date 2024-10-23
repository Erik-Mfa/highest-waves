const multer = require('multer')
const path = require('path')

// Define the storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets/users-images') // Destination folder
  },
  filename: (req, file, cb) => {
    if (!req.body.username) {
      return cb(new Error('Username is required'))
    }

    // Filename format: USERNAME-picture
    const filename = `${req.body.username}-picture${path.extname(file.originalname)}`
    cb(null, filename)
  }
})

// Initialize multer with the storage configuration
const upload = multer({ storage: storage })

module.exports = upload
