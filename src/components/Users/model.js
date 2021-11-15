const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
    {
        avatar: {
            type: String,
            default:
                'https://res.cloudinary.com/perfi-telecom/image/upload/v1611671112/Sistel%20Comercial/default-avatar_yqdmd6.png'
        },
        active: {
            type: Boolean,
            default: true
        },
        company: {
            type: Schema.Types.ObjectId,
            ref: 'Company'
        },
        dni: {
            type: String,
            required: true,
            trim: true
        },
        lastname: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        phoneNumber: String,
        passwordHash: {
            type: String,
            required: [true, 'Password is mandatory.']
        },
        // TODO: Determine roles
        role: [String]
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        },
        versionKey: false
    }
)

userSchema.statics.encryptPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

userSchema.statics.comparePassword = async (receivedPassword, userPassword) => {
    return bcrypt.compareSync(receivedPassword, userPassword)
}

userSchema.statics.toggleState = async (userId, updater) => {
    const instance = await model('User').findById(userId)

    if (!instance) return null

    return await model('User').findByIdAndUpdate(
        userId,
        {
            active: !instance.active,
            updatedBy: updater
        },
        { new: true }
    )
}

module.exports = model('User', userSchema)
