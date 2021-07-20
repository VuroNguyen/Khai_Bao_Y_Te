require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const multer = require('multer')

const verifyEnterpriseToken = require('../middleware/enterpriseAuth')
const Enterprise = require('../models/Enterprise')
const User = require('../models/User')
const sendMail = require('./sendMail')
const sendEnterpriseVeriMail = require('./sendEnterpriseVeriMail')
const sendStaffVerification = require('./sendStaffVerification')
const sendEnterpriseDaily = require('./sendEnterpriseDaily')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        const originalname = file.originalname;
        const extension = originalname.split(".");
        filename = Date.now() + '.' + extension[extension.length - 1];
        cb(null, filename);
    }
});


router.post('/pre-register', async (req, res) => {
    const {email} = req.body

    if(!email) return res.status(400).json({ success: false, message: 'Xin hãy nhập mail'})
    
    if (!validateEmail(email))
        return res.status(400).json({ success: false, message: 'Mail không tồn tại' })

    const enterprise = await Enterprise.findOne({ email })
    if (enterprise) return res.status(400).json({ success: false, message: 'Email đã tồn tại' })

    const isUser = await User.findOne({ email })
    if (isUser) return res.status(400).json({ success: false, message: 'Email này đã được đăng kí dưới dạng email nhân viên' })

    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })

    const url = `http://localhost:3000/registerform`

    sendEnterpriseVeriMail(email, url, accessToken)

    res.json({ success: true, message: 'Nhận email thành công', accessToken, email})
})

router.post('/register',  async (req, res) => {

    const { name, email, address, MST, document } = req.body

    const validName = await Enterprise.findOne({name})
    if(validName) return res.status(400).json({ success: false, message: 'Tên Doanh Nghiệp Đã Tồn Tại' })

    if (!name || !email || !address || !MST)
        return res.status(400).json({ success: false, message: 'Có ô chưa nhập' })

    if (!validateEmail(email))
        return res.status(400).json({ success: false, message: 'Xin hãy nhập mail khác' })

    const enterprise = await Enterprise.findOne({ email })
    if (enterprise) return res.status(400).json({ success: false, message: 'Email đã tồn tại' })

    const isUser = await User.findOne({ email })
    if (isUser) return res.status(400).json({ success: false, message: 'Email này đã được đăng kí dưới dạng email nhân viên' })

    try {
        const newEnterprise = new Enterprise({
            name,
            email,
            address,
            MST,
            document,
        })

        await newEnterprise.save()

        const accessToken = jwt.sign({ enterpriseId: newEnterprise._id, name, email: newEnterprise.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })

        res.json({ success: true, message: 'Nhận email thành công', accessToken, enterpriseInfo: newEnterprise })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Có gì đó không ổn' })
    }

})
router.post('/uploaddoc',  multer({ storage: storage}).single('document'), (req,res) => {
    res.send(`/${req.file.path}`);
})

router.post('/login', async (req, res) => {
    const { email } = req.body

    //simple validation
    if (!email)
        return res.status(400).json({ success: false, message: 'Missing email!!' })
        const isUser = await User.findOne({ email })
        if (isUser) return res.status(400).json({ success: false, message: 'Email này đã được đăng kí dưới dạng email nhân viên' })
    
    try {
        const enterprise = await Enterprise.findOne({email})
        const urlEnterprise = `http://localhost:3000/admindashboard`

        if(!enterprise)
        return res.status(400).json({success: false, message: 'Incorrect Email'})

        const enterpriseAccessToken = jwt.sign({enterpriseId: enterprise._id, email, name: enterprise.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'})
        sendEnterpriseDaily(email, urlEnterprise, enterpriseAccessToken)

        res.json({success: true, message: 'Login Mail thành công', accessToken: enterpriseAccessToken, enterprise: enterprise})
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false, message: 'Có gì đó không ổn' })
    }
})

router.post('/add', verifyEnterpriseToken, async (req, res) => {
    const { email, department, phone } = req.body

    if (!email || !department || !phone)
        return res.status(400).json({ success: false, message: 'Please input all fields' })

    if (!validateEmail(email))
        return res.status(400).json({ success: false, message: 'Please input another email address' })

    const isEnterprise = await Enterprise.findOne({ email })
    if (isEnterprise) return res.status(400).json({ success: false, message: 'Email đã tồn tại dưới dạng đăng kí doanh nghiệp' })

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

        const accessToken = jwt.sign({ userId: addStaff._id, department, phone, email }, process.env.ACCESS_TOKEN_SECRET)

        const url = `http://localhost:3000/form`

        sendStaffVerification(email, url, req.name, accessToken)

        res.json({ success: true, message: 'Nhận email thành công', accessToken, staffInfo: addStaff })
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

router.put('/editstaff/:id', async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update staff information with id=${id}. Maybe Staff was not found!`
            });
          } else res.send({ message: "Staff information was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Staff information with id=" + id
          });
        });
})

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = router