// @ts-check
const router = require('express').Router()

const { mongoError } = require('../../utils/errorHandlers')
const Company = require('./model')
const User = require('../Users/model')
const { encryptPassword } = require('../Users/utils')

router.get('/:id', (req, res) =>
    Company.findById(req.params.id)
        .populate('owner')
        .lean()
        .then((company) => {
            if (!company) return res.sendStatus(404)
            return res.status(200).json(company)
        })
        .catch((error) => mongoError(error, res))
)

router.post('/init-company', async (req, res) => {
    try {
        const { user, ...company } = req.body

        const { CIF, email, name } = company
        const { dni, email: userEmail, name: userName } = user

        const companyMandatoryFields = !user || !CIF || !email || !name
        const userMandatoryFields = !dni || !userName || !userEmail

        if (companyMandatoryFields || userMandatoryFields) {
            return res.status(403).send('Please, check mandatory fields')
        }

        const hasCompany = await Company.findOne({ CIF })
        const hasUser = await User.findOne({ dni })

        if (hasUser)
            return res
                .status(403)
                .send('User already exists. Try with other dni')

        if (hasCompany)
            return res
                .status(403)
                .send('Company already exists. Try with other CIF.')

        const newCompany = await Company.create(company)

        const companyOwner = await User.create({
            ...user,
            company: newCompany._id,
            passwordHash: encryptPassword(dni)
        })

        newCompany.owner = companyOwner._id

        await newCompany.save()

        return res.status(200).json(newCompany)
    } catch (error) {
        mongoError(error, res)
    }
})

module.exports = router
