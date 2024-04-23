import React from 'react'
import ResetPasswordForm from '@/components/ResetPasswordForm'
import { verifyJwt } from '@/lib/jwt'

interface IProps {
  params: {
    jwt: string
  }
}
const ResetPassword: React.FC<IProps> = ({ params }) => {
  const payload = verifyJwt(params.jwt)
  if (!payload) return <p>The URL is not valid!</p>

  return (
    <div>
      <ResetPasswordForm jwtUserId={params.jwt} />
    </div>
  )
}

export default ResetPassword
