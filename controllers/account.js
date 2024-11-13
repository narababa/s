const prisma = require("../config/prisma")


exports.read = async (req, res) => {
    try {
        // code
        const { id } = req.params
        const accounts = await prisma.User.findFirst({
            where: {
                id: Number(id)
            },
            // include: {
            //     // category: true,
            //     images: true
            // }
        })
        res.send(accounts)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}
exports.update = async (req, res) => {
    try {
        // code
        const { email, name, picture, role } = req.body
        // console.log(title, description, price, quantity, images)

        // await prisma.image.deleteMany({
        //     where: {
        //         accountId: Number(req.params.id)
        //     }
        // })

        const account = await prisma.User.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                email: email,
                name: name,
                picture: picture,
                role: role,
            }
        })
        res.send(account)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}
exports.remove = async (req, res) => {
    try {
        const { id } = req.params
        const account = await prisma.User.findFirst({
            where: { id: Number(id) },
        })
        if (!account) {
            return res.status(400).json({ message: 'account not found!!' })
        }
        const deletedImage = account.picture
        const image = await prisma.Images.findFirst({
            where: { name: deletedImage },
        })
                if (!image) {
            return res.status(400).json({ message: 'image not found!!' })
        }
        await prisma.Images.delete({
            where: {
                id: Number(image.id)
            }
        })
        await prisma.User.delete({
            where: {
                id: Number(id)
            }
        })

        res.send('Deleted Success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}