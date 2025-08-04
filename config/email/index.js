// Libraries
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
// Errors
const CustomError = require('../../errors/CustomError')

// Email transporter configuration
const config = {
  service: 'gmail',
  // host: 'smtp.gmail.com',
  // port: 587,
  // secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
}

// Load and replace email template content
const loadTemplate = (templateName, replacements) => {
  const textPath = path.resolve(__dirname, 'templates', templateName, `${templateName}.txt`)
  const htmlPath = path.resolve(__dirname, 'templates', templateName, `${templateName}.html`)

  let textContent = fs.readFileSync(textPath, 'utf8')
  let htmlContent = fs.readFileSync(htmlPath, 'utf8')

  for (const [key, value] of Object.entries(replacements)) {
    const placeholder = `{{${key}}}`
    textContent = textContent.replace(new RegExp(placeholder, 'g'), value)
    htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), value)
  }

  return { text: textContent, html: htmlContent }
}

// Email options by type
const emailOptions = {
  otp: data => ({
    ...loadTemplate('otp', { otp: data.otp }),
    subject: 'Your Uniclubs Verification Code'
  }),
  username: data => ({
    ...loadTemplate('username', { username: data.username }),
    subject: 'Your Uniclubs Username'
  })
}

// Send email function
async function sendMail(data, type) {
  // Check transporter credentials
  const { user, pass } = config.auth
  if (!user || !user.includes('@gmail.com')) throw new CustomError(500, 'Missing transporter email address')
  if (!pass || pass.length !== 16) throw new CustomError(500, 'Missing email app password.')

  // Create transporter
  const transporter = nodemailer.createTransport(config)

  try {
    const mailOptions = emailOptions[type](data)
    await transporter.sendMail({ from: `"Uniclubs" <${user}>`, to: data.email, ...mailOptions })
  } catch (error) {
    throw new CustomError(500, 'Failed to send email.')
  }
}

module.exports = sendMail
