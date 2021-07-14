require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const multer = require('multer')

const verifyEnterpriseToken = require('../middleware/enterpriseAuth')
const Enterprise = require('../models/Enterprise')
const User = require('../models/User')
const sendMail = require('./sendMail')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const originalname = file.originalname;
        const extension = originalname.split(".");
        filename = Date.now() + '.' + extension[extension.length - 1];
        cb(null, filename);
    }
});

router.post('/register', multer({ storage: storage}).single('document'), async (req, res) => {

    const { name, email, address, MST } = req.body

    if (!name || !email || !address || !MST)
        return res.status(400).json({ success: false, message: 'Có ô chưa nhập' })

    // if (!validateEmail(email))
    //     return res.status(400).json({ success: false, message: 'Xin hãy nhập mail khác' })

    const enterprise = await Enterprise.findOne({ email })
    if (enterprise) return res.status(400).json({ success: false, message: 'Email đã tồn tại' })

    try {
        const newEnterprise = new Enterprise({
            name,
            email,
            address,
            MST,
            document: req.file.path,
        })

        await newEnterprise.save()

        const accessToken = jwt.sign({ enterpriseId: newEnterprise._id, name, email: newEnterprise.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })

        const url = `http://localhost:3000/report`

        sendMail(email, url)

        res.json({ success: true, message: 'Nhận email thành công', accessToken, enterpriseInfo: newEnterprise })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Có gì đó không ổn' })
    }

})

router.post('/add', verifyEnterpriseToken, async (req, res) => {
    const { email, department, phone } = req.body

    if (!email || !department || !phone)
        return res.status(400).json({ success: false, message: 'Please input all fields' })

    if (!validateEmail(email))
        return res.status(400).json({ success: false, message: 'Please input another email address' })

    const staff = await User.findOne({ email })

    if (staff)
        return res.status(400).json({ success: false, message: 'Email is already exists' })

    try {
        const addStaff = new User({
            email,
            status: false,
            department,
            phone,
            enterpriseId: req.enterpriseId,
            enterpriseName: req.name,
        })

        await addStaff.save()

        const url = `http://localhost:3000/form/`

        sendMail(email, url)

        res.json({ success: true, message: 'Nhận email thành công', staffInfo: addStaff })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Có gì đó không ổn' })
    }
})

router.get('/getAllEnterprise', async (req, res) => {
    const email = req.query.email;
    const emailQuery = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

    Enterprise.find(emailQuery)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving forms."
            });
        });
})

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = router