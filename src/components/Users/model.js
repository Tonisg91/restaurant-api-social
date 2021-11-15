const { Schema, model } = require('mongoose')

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
        email: {
            type: String,
            trim: true,
            unique: true
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
