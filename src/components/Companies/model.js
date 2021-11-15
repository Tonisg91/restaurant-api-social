const { Schema, model } = require('mongoose')

module.exports = model(
    'Company',
    new Schema({
        active: {
            type: Boolean,
            default: true
        },
        CIF: String,
        email: String,
        hiredModules: String,
        logo: String,
        name: String,
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        phoneNumber: String,
        externalId: String
    })
)
