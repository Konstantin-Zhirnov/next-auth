import React from 'react'
import Link from 'next/link'
import SignUpForm from '@/components/SignUpForm'

const Signup = () => {
  return (
    <div>
      <div>
        <p>Already Signed up?</p>
        <Link href="/auth/signin">Sign In</Link>

        <SignUpForm />
      </div>
    </div>
  )
}

export default Signup
