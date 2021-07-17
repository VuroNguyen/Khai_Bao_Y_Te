const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const { OAuth2 } = google.auth
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

//Send Mail to new staff add in DB of a enterprise

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

const sendStaffVerification = (to, url, enterpriseName) => {
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
        subject: 'Xác minh khai báo doanh nghiệp',
        html: `
            <p><strong>Hệ thống Khai báo y tế dành cho Doanh nghiệp thông báo,</strong></p>
            <p><strong>${enterpriseName}</strong> đã thêm <strong>${to}</strong> vào danh sách nhân viên.</p>
            <p>Để xác thực tài khoản và thêm vào thành viên công ty trong hệ thống, vui lòng chọn <strong>Xác nhận.</strong></p>
            <p>&nbsp;</p>
            <p><a href="${url}"><input style="border-radius: 5%; font-size: 18px; width: 30%; height: 55px; background-color: #008cba; color: white;" type="button" value="Xác nhận" /></a></p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p><span style="color: #999999;">Nếu bạn không thuộc doanh nghiệp này, vui lòng bỏ qua email</span></p>
        `
    }

    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) return error;
        return info
    })
}

module.exports = sendStaffVerification