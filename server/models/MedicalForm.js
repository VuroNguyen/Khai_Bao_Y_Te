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
        enum: ['Không', 'Có và đã khai báo 14 ngày', 'Anh/Chị là người tiếp xúc', 'Người thân tiếp xúc gần của Anh/Chị là người tiếp xúc', 'Cả hai đều là người tiếp xúc']
    },

    quest6: {
        type: String,
        enum: ['Không', 'Có và đã khai báo 14 ngày', 'Anh/Chị là người di chuyển', 'Người thân tiếp xúc gần của Anh/Chị là người di chuyển', 'Cả hai đều là người di chuyển']
    },

    quest7: {
        type: String,
        enum: ['Không', 'Có và đã khai báo 14 ngày', 'Anh/Chị là người di chuyển/tiếp xúc', 'Người thân tiếp xúc gần của Anh/Chị là người di chuyển/tiếp xúc', 'Cả hai đều là người di chuyển/tiếp xúc']
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('medicalform', MedicalFormSchema)