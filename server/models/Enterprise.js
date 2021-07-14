const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EnterpriseSchema = new Schema({
    
    name: {
        type: String,
        unique: true,
    },

    email: {
        type: String,
        unique: true,
    },

    address: {
        type: String,
    },

    MST: {
        type: String,
    },

    document: {
        type: String,
    },

},
{
    timestamps: true
})

module.exports = mongoose.model('enterprise', EnterpriseSchema)