'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import validator from 'validator'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordStrength } from 'check-password-strength'
import PasswordStrength from '@/components/PasswordStrength'
import { registerUser } from '@/lib/actions/authActions'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string({ required_error: 'Please enter your password' }),
})

type InputType = z.infer<typeof FormSchema>

const SignInForm: React.FC = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn('credentials', {
      redirect: false,
      username: data.email,
      password: data.password,
    })

    if (!result?.ok) {
      toast.error(result?.error)
      return
    }
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      <p>{errors?.email?.message}</p>

      <input {...register('password')} type="password" placeholder="Password" />
      <p>{errors?.password?.message}</p>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  )
}

export default SignInForm
