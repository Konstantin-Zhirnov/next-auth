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

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'First name must be at least 2 characters')
      .max(20, 'First name must be less 20 characters')
      .regex(new RegExp('^[a-zA-Z]+$'), 'No special character allowed!'),
    lastName: z
      .string()
      .min(2, 'Last name must be more 2 characters')
      .max(20, 'Last name must be less 20 characters')
      .regex(new RegExp('^[a-zA-Z]+$'), 'No special character allowed!'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().refine(validator.isMobilePhone, 'Please enter a valid phone number'),
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
const SignUpForm = () => {
  const [passStrength, setPassStrength] = React.useState(0)

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  })

  const createUser: SubmitHandler<InputType> = async (data) => {
    const { confirmPassword, ...user } = data
    try {
      const result = await registerUser(user)
      toast.success('The User Registered Successfully')
    } catch (e) {
      toast.error('Something Went Wrong!')
      console.log(e)
    }
  }

  React.useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id)
  }, [watch().password])

  return (
    <form onSubmit={handleSubmit(createUser)}>
      <input {...register('firstName')} placeholder="First Name" />
      <p>{errors?.firstName?.message}</p>

      <input {...register('lastName')} placeholder="Last Name" />
      <p>{errors?.lastName?.message}</p>

      <input {...register('email')} placeholder="Email" />
      <p>{errors?.email?.message}</p>

      <input {...register('phone')} placeholder="Phone" />
      <p>{errors?.phone?.message}</p>

      <input {...register('password')} type="password" placeholder="Password" />
      <PasswordStrength passStrength={passStrength} />
      <p>{errors?.password?.message}</p>

      <input {...register('confirmPassword')} type="password" placeholder="Confirm password" />
      <p>{errors?.confirmPassword?.message}</p>

      <button type="submit">Submit</button>
    </form>
  )
}

export default SignUpForm
