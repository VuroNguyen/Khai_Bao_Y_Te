require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const verifyEnterpriseToken = require('../middleware/enterpriseAuth')
const Enterprise = require('../models/Enterprise')
const User = require('../models/User')
const sendMail = require('./sendMail')

router.post('/register', async(req, res) => {
    
    const {name, email, address, MST, document} = req.body

    if(!name || !email || !address || !document || !document)
    return res.status(400).json({success: false, message: 'Có ô chưa nhập'})

    if(!validateEmail(email))
    return res.status(400).json({success: false, message: 'Xin hãy nhập mail khác'})

    const enterprise = await Enterprise.findOne({email})
    if(enterprise) return res.status(400).json({success: false, message: 'Email đã tồn tại'})

    try {
        const newEnterprise = new Enterprise({
            name,
            email,
            address,
            MST,
            document
        })

        await newEnterprise.save()

        const accessToken = jwt.sign({enterpriseId: newEnterprise._id, name, email: newEnterprise.email, address, MaSoThue: newEnterprise.MST, document}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'})

        const url = `http://localhost:3000/report`

        sendMail(email, url)

        res.json({success: true, message: 'Nhận email thành công', accessToken, enterpriseInfo: newEnterprise})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Có gì đó không ổn'})
    }

})

router.post('/add', verifyEnterpriseToken, async(req, res) => {
    const {email} = req.body

    if(!email)
    return res.status(400).json({success: false, message: 'Please input an email address'})

    if(!validateEmail(email))
    return res.status(400).json({success: false, message: 'Please input another email address'})

    const staff = await User.findOne({email})

        if(staff)
        return res.status(400).json({success: false, message: 'Email is already exists'})

    try {
        const addStaff = new User({
            email,
            status: false,
            enterpriseId : req.enterpriseId,
            enterpriseName : req.name,
        })

        await addStaff.save()

        const url = `http://localhost:3000/form/`

        sendMail(email, url)

        res.json({success: true, message: 'Nhận email thành công', staffInfo: addStaff})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Có gì đó không ổn'})
    }
})

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = router