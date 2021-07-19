const express = require('express')
const router = express.Router()

const verifyToken = require('../middleware/auth')
const MedicalForm = require('../models/MedicalForm')

router.post('/', verifyToken, async (req, res) => {
  const { department, phone, quest4, quest5, quest6, quest7 } = req.body;

  // if (!quest2)
  //   return res.status(400).json({ success: false, message: 'Câu 2 không được để trống' })

  try {
    const newForm = new MedicalForm({
      email: req.email,
      department,
      phone,
      quest4,
      quest5: quest5 || 'Không',
      quest6: quest6 || 'Không',
      quest7: quest7 || 'Không',
      userId: req.userId,

    })

    await newForm.save()

    res.json({ success: true, message: 'Đã thêm 1 khai báo', post: newForm })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Có gì đó không ổn' })
  }
});

router.get('/form', async (req, res) => {
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

router.get('/form/count', async (req, res) => {
  const email = req.query.email;
  const condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

  MedicalForm.find(condition).countDocuments()
    .then(data => {
      res.json({ success: true, count: data })
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving forms."
      });
    });
})

router.get('/form/lastform', async (req, res) => {
  const email = req.query.email;
  const condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

  MedicalForm.find(condition).limit(1).sort({ $natural: -1 })
    .then((data) => {
      res.send(data)
    })
     .catch(err => {
        console.log('Error:', err);
      })
})

router.get('/form/getAllFormToday', async (req, res) => {
  const email = req.query.email;
  const condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

  const startOfToday = new Date();
startOfToday.setHours(0,0,0,0);

  MedicalForm.find({$and: [condition, {"createdAt": { "$gte": startOfToday}}]})
  .then((data) => {
    res.send(data)
  })
   .catch(err => {
      console.log('Error:', err);
    })
})

module.exports = router