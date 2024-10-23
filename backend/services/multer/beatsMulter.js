/* eslint-disable no-undef */
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Ensure that the upload directories exist
const imageUploadDir = path.join(__dirname, '../../public/assets/beats-logos') // Adjust path as necessary
const audioUploadDir = path.join(__dirname, '../../public/assets/beats-audios') // Adjust path as necessary

// Create directories if they don't exist
if (!fs.existsSync(imageUploadDir)) {
  fs.mkdirSync(imageUploadDir, { recursive: true })
}

if (!fs.existsSync(audioUploadDir)) {
  fs.mkdirSync(audioUploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'image') {
      cb(null, imageUploadDir)
    } else if (file.fieldname === 'audioURL') {
      cb(null, audioUploadDir)
    }
  },
  filename: (req, file, cb) => {
    const uploadDir =
      file.fieldname === 'image' ? imageUploadDir : audioUploadDir

    // Read the directory to find the highest numbered file
    fs.readdir(uploadDir, (err, files) => {
      if (err) {
        console.error('Error reading the directory:', err)
        return cb(err)
      }

      // Filter out only the files that match the pattern (e.g., numbers with extensions)
      const numberedFiles = files
        .map((file) => parseInt(path.parse(file).name)) // Get the numeric part of the filename
        .filter((number) => !isNaN(number)) // Filter out NaN (non-numeric filenames)

      // Determine the new file number
      const newNumber =
        numberedFiles.length > 0 ? Math.max(...numberedFiles) + 1 : 1

      // Create the new filename with the incremented number
      const newFilename = `${newNumber}${path.extname(file.originalname)}`

      cb(null, newFilename)
    })
  }
})

const upload = multer({ storage: storage })

module.exports = upload
