const express = require('express')
const cors = require('cors')
const multer = require('multer')
const dotenv = require('dotenv')

const analyseResumeHandler = require('./routes/analyse.js')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// middleware
app.use(cors({
  origin: "*"
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// multer config
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true)
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'), false)
    }
  }
})

// routes
app.post('/api/analyse', upload.single('resume'), analyseResumeHandler)

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ResumeLens backend is running with Gemini'
  })
})

app.get("/", (req, res) => {
  res.send("ResumeLens API is running 🚀");
})

// start server
app.listen(PORT, () => {
  console.log(`🚀 ResumeLens backend running on port ${PORT}`)
})