require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

const User = require('../models/User')
const Enterprise = require('../models/Enterprise')
const sendMail = require('./sendMail')
const sendEnterpriseDaily = require('./sendEnterpriseDaily')
const sendUserDaily = require('./sendUserDaily')

router.post('/register', async (req, res) => {
    const { email } = req.body;

    if (!email)
        return res.status(400).json({ success: false, message: 'Xin hãy nhập mail vào' })

    if (!validateEmail(email))
        return res.status(400).json({ success: false, message: 'Xin hãy nhập mail khác' })

    const user = await User.findOne({ email })
    if (user) return res.status(400).json({ success: false, message: 'Email đã tồn tại' })

    const isEnterprise = await Enterprise.findOne({ email })
    if (isEnterprise) return res.status(400).json({ success: false, message: 'Email đã tồn tại dưới dạng đăng kí doanh nghiệp' })

    try {
        const newUser = new User({
            email,
            status: false,
        })

        await newUser.save()

        const accessToken = jwt.sign({ userId: newUser._id, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })

        const url = `http://localhost:3000/form/`

        sendMail(email, url)

        res.json({ success: true, message: 'Nhận email thành công', accessToken, user: newUser })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Có gì đó không ổn' })
    }
});

router.post('/activation', async (req, res) => {
    try {
        const { accessToken } = req.body
        const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        res.json({ success: true, userInfo: user })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
})

router.post('/login', async (req, res) => {
    const { email } = req.body

    //simple validation
    if (!email)
        return res.status(400).json({ success: false, message: 'Missing email!!' })

    try {
        const user = await User.findOne({email})
        const enterprise = await Enterprise.findOne({email})
        const urlEnterprise = `http://localhost:3000/admindashboard`
        const urlUser = `http://localhost:3000/form/`

        if(!enterprise && !user)
        return res.status(400).json({success: false, message: 'Incorrect Email'})
    
        if(enterprise) {
            const enterpriseAccessToken = jwt.sign({enterpriseId: enterprise._id, email, name: enterprise.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'})
            sendEnterpriseDaily(email, urlEnterprise)

        res.json({success: true, message: 'Login Mail thành công', accessToken: enterpriseAccessToken, enterprise: enterprise})
        } else if(user) {
            const accessToken = jwt.sign({userId: user._id, email, enterpriseName: user.enterpriseName, department: user.department, phone: user.phone}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'})
            sendUserDaily(email, urlUser)


            res.json({ success: true, message: 'Login Mail thành công', accessToken, user: user })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Có gì đó không ổn' })
    }
})

router.get('/getAllEmail', async (req, res) => {
    const email = req.query.email;
    const emailQuery = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

    const enterpriseName = req.query.enterpriseName;
    const nameQuery = enterpriseName ? { enterpriseName: { $regex: new RegExp(enterpriseName), $options: "i" } } : {};

    User.find(email ? emailQuery : enterpriseName ? nameQuery : {})
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

// @route GET API email user
// desc check user logged or not
// public
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user)
            return res.status(400).json({ success: false, message: 'Email not found' })
        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

router.put('/verification/:id', async (req, res) => {
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
              message: `Cannot update user information with id=${id}. Maybe user was not found!`
            });
          } else res.send({ message: "User information was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating user information with id=" + id
          });
        });
})

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = router