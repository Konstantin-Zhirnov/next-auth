'use server'

import * as bcrypt from 'bcrypt'

import { User } from '@prisma/client'
import prisma from '../prisma'
import { compileActivationTemplate, resetPassTemplate, sendMail } from '@/lib/mail'
import { signJwt, verifyJwt } from '@/lib/jwt'

export async function registerUser(user: Omit<User, 'id' | 'emailVerified' | 'image'>) {
  const result = await prisma.user.create({
    data: { ...user, password: await bcrypt.hash(user.password, 10) },
  })

  const jwtUserId = signJwt({
    id: result.id,
  })
  const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`
  const body = compileActivationTemplate(user.firstName, activationUrl)
  await sendMail({ to: user.email, subject: 'Activate Your Account', body })
  return result
}

type ActivateUserFunc = (
  jwtUserId: string,
) => Promise<'userNotExist' | 'alreadyActivated' | 'success'>

export const activateUser: ActivateUserFunc = async (jwtUserId) => {
  const payload = verifyJwt(jwtUserId)
  const userId = payload?.id

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) return 'userNotExist'
  if (user.emailVerified) return 'alreadyActivated'

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: new Date(),
    },
  })
  return 'success'
}

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) throw new Error('The user does not exist!')

  const jwtUserId = signJwt({
    id: user.id,
  })
  const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/password/${jwtUserId}`
  const body = resetPassTemplate(user.firstName, resetPassUrl)
  return await sendMail({ to: user.email, subject: 'Reset Password', body })
}

type ResetPasswordFunc = (
  jwtUserId: string,
  password: string,
) => Promise<'userNotExist' | 'success'>

export const resetPassword: ResetPasswordFunc = async (jwtUserId, password) => {
  const payload = verifyJwt(jwtUserId)
  if (!payload) return 'userNotExist'

  const userId = payload.id
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  if (!user) return 'userNotExist'

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: await bcrypt.hash(password, 10),
    },
  })

  if (result) return 'success'
  else throw new Error('Something went wrong!')
}
