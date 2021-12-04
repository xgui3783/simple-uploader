const express = require('express')
const path = require('path')
const multer = require("multer")
const app = express()

const { SIMPLE_UPLOAD_UPLOAD_DIR, PORT=4001 } = process.env

if (!SIMPLE_UPLOAD_UPLOAD_DIR) throw new Error(`SIMPLE_UPLOAD_UPLOAD_DIR needs to be defined!`)

const storage = multer.diskStorage({
    destination: SIMPLE_UPLOAD_UPLOAD_DIR,
    filename: function(req, file, callback){
        callback(null, file.originalname)
    }
})

const upload = multer({ storage })

app.get('/upload', (req, res) => {
    pathToUploadHtml = path.join(__dirname, 'upload.html')
    res.sendFile(pathToUploadHtml)
})

app.post('/uploadfile', upload.single('uploaded_file'),
    (req, res) => {
        res.redirect('/upload')
    }
)

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})