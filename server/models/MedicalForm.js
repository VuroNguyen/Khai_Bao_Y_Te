const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MedicalFormSchema = new Schema({

    email: {
        type: String,
        ref: 'users'
    },

    quest2: {
        type: String,
        required: true
    },

    quest3: {
        type: String,
        required: true
    },

    quest4: {
        type: String,
    },

    quest5: {
        type: String,
    },

    quest6: {
        type: String,
    },

    quest7: {
        type: String,
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('medicalform', MedicalFormSchema)