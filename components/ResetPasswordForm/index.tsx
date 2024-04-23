'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import validator from 'validator'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordStrength } from 'check-password-strength'
import PasswordStrength from '@/components/PasswordStrength'
import { registerUser, resetPassword } from '@/lib/actions/authActions'
import { toast } from 'react-toastify'

const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, 'First name must be at least 6 characters')
      .max(20, 'First name must be less 20 characters'),
    confirmPassword: z
      .string()
      .min(6, 'First name must be at least 6 characters')
      .max(20, 'First name must be less 20 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ['confirmPassword'],
  })

type InputType = z.infer<typeof FormSchema>

interface IProps {
  jwtUserId: string
}
const ResetPasswordForm: React.FC<IProps> = ({ jwtUserId }) => {
  const [passStrength, setPassStrength] = React.useState(0)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await resetPassword(jwtUserId, data.password)
      if (result === 'success') toast.success('Your password has been reset successfully!')
    } catch (e) {
      toast.error('Something Went Wrong!')
      console.log(e)
    }
  }

  React.useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id)
  }, [watch().password])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('password')} type="password" placeholder="Password" />
      <PasswordStrength passStrength={passStrength} />
      <p>{errors?.password?.message}</p>

      <input {...register('confirmPassword')} type="password" placeholder="Confirm password" />
      <p>{errors?.confirmPassword?.message}</p>

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Please wait...' : 'Submit'}
      </button>
    </form>
  )
}

export default ResetPasswordForm
