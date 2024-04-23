'use client'

import React from 'react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPassword } from '@/lib/actions/authActions'
import { toast } from 'react-toastify'

const FormSchema = z.object({
  email: z.string().email('Please enter a valid email!'),
})

type InputType = z.infer<typeof FormSchema>

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    try {
      await forgotPassword(data.email)
      toast.success('Reset password link was sent to your email.')
      reset()
    } catch (e) {
      console.log(e)
      toast.error('Something went wrong!')
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Enter your email</p>
        <input {...register('email')} />
        <p>{errors.email?.message}</p>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Please wait...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
