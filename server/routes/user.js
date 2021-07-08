require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.post('/', async(req, res) => {
    const {email} = req.body;

    if(!email)
    return res.status(400).json({success: false, message: 'Xin hãy nhập mail vào'})

    try {
        const newUser = new User({
            email
        })

        await newUser.save()

        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)

        res.json({success: true, message: 'Nhận email thành công', accessToken, user: newUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Có gì đó không ổn'})
    }
});

module.exports = router