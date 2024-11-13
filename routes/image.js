const express = require('express')
const router = express.Router()
const { authCheck, adminCheck } = require('../middlewares/authCheck')
const { read, list, remove, createImages, removeImage }  = require('../controllers/image')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const dbCon = require("../config/db.config")

// @ENDPOINT http://localhost:5001/api/image
// router.post('/image/', create)
router.get('/image/:name', read ) 
router.get('/imageall', authCheck, adminCheck, list)
router.delete('/image/:id', remove)
router.post('/images', createImages)
router.post('/removeimages', authCheck, adminCheck, removeImage)


// // Membuat fungsi untuk menghapus file
// const deleteFile = (file) => {
//     fs.unlink(file.path, (err) => {
//       if (err) {
//         console.error(err);
//         throw new Error("Failed to delete file");
//       }
//     });
//   };


const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.png')
    }
})

const formdata = multer({
    storage: diskstorage
}).single('image')


// @ENDPOINT http://localhost:5001/api/images/post
router.post('/images/post', formdata, async (req, res) => {
    const type = req.file.mimetype
    const name = req.file.filename
    const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))
    try {
        dbCon.query(
            "INSERT INTO Images(type, name, data, createdAt, updatedAt) VALUES(?, ?, ?, ?, ?)",
            [type, name, data, new Date(), new Date()],
            (err, results) => {
                if (err) {
                    console.log("Error while inserting a user into the database", err);
                    return res.status(400).send();
                }
                // console.log(results)
                return res.status(201).json({ message: name});
            }
        )
        let filePath = path.join(__dirname, '../images/' + req.file.filename)
        setTimeout(() => {
            fs.unlink(filePath, err => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('succesfully deleted from the downloads folder')
                }
            })
        }, 5000)
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }




})
module.exports = router