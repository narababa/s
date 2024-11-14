const prisma = require("../config/prisma")


// exports.create = async(req,res)=>{
//     const { name } = req.file
//         try{
//             console.log(name)
//             //code
//             // const images = await prisma.images.create({
//             //     data:{
//             //         name: name,
//             //         data: data,
//             //         type: type
//             //     }
//             // })
//             // res.send(images)
//             // console.log(image)
//         }catch(err){
//             console.log(err)
//             res.status(500).json({ message : "Server error" })
//         }

// }

exports.read = async (req, res) => {
    try {
        const { name } = req.params
        const images = await prisma.images.findFirst({
            where: {
                name: name
            }
        })
        res.contentType('image/png');
        res.send(images.data)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

exports.list = async(req,res)=>{
    try{
        const images = await prisma.images.findMany({
            select: {
                id: true,
                name: true
            }
        })
        res.send(images)
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error" })
    }
}

exports.remove = async (req, res) => {
    try {
        const { id } = req.params
        const image = await prisma.Images.findFirst({
            where: { id: Number(id) },
        })
        if (!image) {
            return res.status(400).json({ message: 'image not found!!' })
        }
        await prisma.Images.delete({
            where: {
                id: Number(id)
            }
        })
        res.send(image.name)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}



exports.createImages = async (req, res) => {
    try {
        //code
        const name = [req.body]
        console.log(name)
            // const images = await prisma.images.create({
            //     data:{
            //         name: Date.now() + '.png',
            //         data: [image.data],
            //         type: 'image/png'
            //     }
            // })
            // // // res.send(images)
            // console.log(images)
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}


exports.removeImage = async (req, res) => {
    try {
        const { deletedImage } = req.body

        const image = await prisma.Images.findFirst({
            where: { name: deletedImage },
        })
                if (!image) {
            return res.send('image not found!!')
        }
        await prisma.Images.delete({
            where: {
                id: Number(image.id)
            }
        })
        res.send('Deleted Success')
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}