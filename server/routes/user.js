require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const sendMail = require('./sendMail')

router.post('/', async(req, res) => {
    const {email} = req.body;

    if(!email)
    return res.status(400).json({success: false, message: 'Xin hãy nhập mail vào'})

    if(!validateEmail(email))
    return res.status(400).json({success: false, message: 'Xin hãy nhập mail khác'})

    const user = await User.findOne({email})
    if(user) return res.status(400).json({success: false, message: 'Email đã tồn tại'})

    try {
        const newUser = new User({
            email
        })

        await newUser.save()

        const accessToken = jwt.sign({userId: newUser._id, email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'})

        const url = `${process.env.CLIENT_URL}/home/activate/${accessToken}`

        sendMail(email, url)

        res.json({success: true, message: 'Nhận email thành công', accessToken, user: newUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Có gì đó không ổn'})
    }
});

router.post('/activation',  async(req, res) => {
    try {
        const {accessToken} = req.body
        const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        console.log(user)
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
})

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = router