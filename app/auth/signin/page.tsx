import React from 'react'
import Link from 'next/link'

import SignInForm from '@/components/SignInForm'

const Signup: React.FC = () => {
  return (
    <div>
      <div>
        <SignInForm />
        <Link href="/auth/forgotPassword">Forgot Your Password?</Link>
      </div>
    </div>
  )
}

export default Signup
