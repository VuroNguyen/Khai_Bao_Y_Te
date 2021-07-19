const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MedicalFormSchema = new Schema({

    email: {
        type: String,
        ref: 'users'
    },

    department: {
        type: String,
        required: true
    },

    phone: {
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

    status: {
        type: Boolean,
        ref: 'users'
    },

    enterpriseName: {
        type: String,
        ref: 'users'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('medicalform', MedicalFormSchema)