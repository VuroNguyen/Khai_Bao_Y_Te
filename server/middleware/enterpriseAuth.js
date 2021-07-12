const jwt = require('jsonwebtoken')

const verifyEnterpriseToken = (req, res,next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) 
    return res
    .status(401)
    .json({sucess: false, message: 'Access Token Not Found'})

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.enterpriseId = decoded.enterpriseId
        req.name = decoded.name
        next()
    } catch (err) {
        console.log(err)
        return res.status(403).json({success: false, message: 'Invalid Token'})
    }
}

module.exports = verifyEnterpriseToken