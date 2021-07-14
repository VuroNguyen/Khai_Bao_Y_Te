const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    status: {
        type: Boolean,
        required: true,
    },

    department: {
        type: String,
    },

    phone: {
        type: Number,
    },

    enterpriseId: {
        type: Schema.Types.ObjectId,
        ref: 'enterprise'
    },

    enterpriseName: { 
        type: String,
        ref: 'enterprise'
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('users', UserSchema)