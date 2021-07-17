const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const { OAuth2 } = google.auth
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

//send mail to enterpise everytime they log in

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFESH_TOKEN,
    MAILING_SERVICE_ADDRESS,
    SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFESH_TOKEN,
    MAILING_SERVICE_ADDRESS,
    OAUTH_PLAYGROUND
)

const sendEnterpriseDaily = (to, url) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: 'XÁC THỰC EMAIL QUA KHAI BÁO Y TẾ',
        html: `
            <h2>Xin chào ${to}, </h2>
            <h4>Đây là Enterprise Daily thư tự động của hệ thống Khai báo y tế - FIS từ </h4>
            <p>bạn vui lòng xác nhận mail để khai báo </p>
            <a href="${url}"><input style="border-radius: 5%;
            font-size: 18px;
            width: 30%;
            background-color: #008CBA;
            color: white;" type="button" value="Verify Email" /></a>
        `
    }

    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) return error;
        return info
    })
}

module.exports = sendEnterpriseDaily