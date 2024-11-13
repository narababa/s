const prisma = require("../config/prisma")
const multer = require('multer')
const path = require('path')
const fs = require('fs')


const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.png')
    }
})
const formdata = multer({
    storage: diskstorage
}).single('image')

exports.formdata = async(req,res)=>{
    // const { name } = req.file
    const type = req.file.mimetype
    const name = req.file.filename
    const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))
  
        try{
            console.log(name)
            //code
            // const images = await prisma.images.create({
            //     data:{
            //         name: name,
            //         data: data,
            //         type: type
            //     }
            // })
            // res.send(images)
            // console.log(image)
        }catch(err){
            console.log(err)
            res.status(500).json({ message : "Server error" })
        }

}
