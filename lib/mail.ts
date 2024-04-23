import Handlebars from 'handlebars'
import nodemailer from 'nodemailer'
import { activationTemplate } from '@/lib/templates/activation'
import { resetPasswordTemplate } from '@/lib/templates/password'

type MailType = {
  to: string
  subject: string
  body: string
}

export async function sendMail({ to, subject, body }: MailType) {
  const { EMAIL, GMAIL_PASS } = process.env
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: GMAIL_PASS,
    },
  })

  try {
    const testResult = await transport.verify()
  } catch (e) {
    console.log(e)
  }

  try {
    const sendResult = await transport.sendMail({
      from: EMAIL,
      to,
      subject,
      html: body,
    })
  } catch (e) {
    console.log(e)
  }
}

export function compileActivationTemplate(name: string, url: string) {
  const template = Handlebars.compile(activationTemplate)
  const htmlBody = template({ name, url })
  return htmlBody
}

export function resetPassTemplate(name: string, url: string) {
  const template = Handlebars.compile(resetPasswordTemplate)
  const htmlBody = template({ name, url })
  return htmlBody
}
