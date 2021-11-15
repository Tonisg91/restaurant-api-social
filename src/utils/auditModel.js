const { Schema, model } = require('mongoose')

const auditProps = {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    active: {
        type: Boolean,
        default: true
    }
}

const Model = (defaultProps) => {
    return (name, props) => {
        const schema = new Schema(
            {
                ...defaultProps,
                ...props
            },
            {
                timestamps: true,
                versionKey: false
            }
        )

        schema.statics.toggleState = async (id, userId) => {
            const instance = await model(name).findById(id)
            if (!instance) return null
            return await model(name).findByIdAndUpdate(
                id,
                {
                    active: !instance.active,
                    updatedBy: userId
                },
                { new: true }
            )
        }

        return model(name, schema)
    }
}

const withAudit = Model(auditProps)

module.exports = withAudit
