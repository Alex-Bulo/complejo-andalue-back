const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


module.exports = {
    DOMAIN : process.env.NODE_ENV ? process.env.DOMAIN + 'api/' : 'http://localhost:3001/',
    RES_URL : process.env.NODE_ENV ? 'https://andalue-space.nyc3.digitaloceanspaces.com/' : 'http://localhost:3001/',
    sgMail
}
