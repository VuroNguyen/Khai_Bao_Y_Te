const express = require('express')
const router = express.Router()

const verifyToken = require('../middleware/auth')
const MedicalForm = require('../models/MedicalForm')

router.post('/', verifyToken, async(req, res) => {
    const {quest1, quest2, quest3, quest4, quest5} = req.body;

    if(!quest1)
    return res.status(400).json({success: false, message: 'Câu 1 không được để trống'})

    try {
        const newForm = new MedicalForm({
            quest1, 
            quest2, 
            quest3: quest3 || 'Không', 
            quest4: quest4 || 'Không', 
            quest5: quest5 || 'Không',
            user: req.userId,
            email: req.email
        })

        await newForm.save()

        res.json({success: true, message: 'Đã thêm 1 khai báo', post: newForm})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Có gì đó không ổn'})
    }
});

router.get('/form', async(req, res) => {
    const email = req.query.email;
    const condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

    MedicalForm.find(condition)
    .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving forms."
        });
      });
});

module.exports = router