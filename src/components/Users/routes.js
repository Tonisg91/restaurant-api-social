// @ts-check
const router = require('express').Router()

const User = require('./model')
const { encryptPassword, comparePassword, encodeToken } = require('./utils')

router.post('/create', async (req, res) => {
    try {
        // company, dni, name, role
        const { company, dni } = req.body

        const hasUser = await User.findOne({ dni })

        if (!company) return res.status(403).send('Company is mandatory')
        if (hasUser) return res.status(403).send('User already exists')

        const body = {
            ...req.body,
            passwordHash: encryptPassword(dni)
        }

        await User.create(body)
        return res.sendStatus(204)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'MongoDB error', error })
    }
})
router.post('/login', async (req, res) => {
    try {
        const { dni, password } = req.body

        if (!dni || !password)
            return res.status(403).send('Dni and password are mandatory')

        const user = await User.findOne({ dni }).lean()
        if (!user) return res.status(400).send("User doesn't exists")

        const passwordMatch = comparePassword(password, user.passwordHash)

        if (!passwordMatch) return res.status(400).send('Wrong password')

        const { passwordHash, ...data } = user

        const responseData = {
            token: encodeToken(user._id),
            ...data
        }

        return res.status(200).json(responseData)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'MongoDB error', error })
    }
})
router.put('/:id')
router.patch('/:id', (req, res) => {})

module.exports = router
