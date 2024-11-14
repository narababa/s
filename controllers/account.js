const prisma = require("../config/prisma")


exports.read = async (req, res) => {
    try {
        // code
        const { id } = req.params
        const accounts = await prisma.User.findFirst({
            where: { id: Number(id) },
            select: {
                email: true,
                enabled: true,
                name: true,
                picture: true,
                role: true,
            }
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
        res.send('Update Success')
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
        console.log(account)
        if (!account) {
            return res.status(400).json({ message: 'Product not found!!' })
        }
        const deletedImage = User.picture
        const idna = account.id
        const image = await prisma.Images.findFirst({
            where: { name: deletedImage },
        })
                if (!image) {
                    await prisma.User.delete({
                        where: {
                            id: Number(idna)
                        }
                    })
                  return res.send('image not found!!')
        }
        await prisma.Images.delete({
            where: {
                id: Number(image.id)
            }
        })
        // Step 3 ลบสินค้า
        await prisma.User.delete({
            where: {
                id: Number(idna)
            }
        })

       return res.send('Deleted Success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}