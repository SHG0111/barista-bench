import nodemailer from 'nodemailer'

export async function sendMailtrapEmail(to: string, subject: string, html: string) {
  const smtpUser = process.env.MAILTRAP_SMTP_USER || '0d6cd2ab027635'
  const smtpPass = process.env.MAILTRAP_SMTP_PASS || '3cbbc86c18d307'

  if (!smtpUser || !smtpPass) {
    console.warn('Mailtrap SMTP credentials not configured')
    return null
  }

  console.log('Mailtrap SMTP: Sending to', to)

  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const info = await transporter.sendMail({
    from: { name: 'Barista Bench', address: 'test@baristabench.com' },
    to,
    subject,
    html,
  })

  console.log('Mailtrap SMTP: Email sent, message ID:', info.messageId)
  return info
}
