'use client'

import React from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

import styles from './Authorization.module.sass'

const Authorization = () => {
  const { data: session } = useSession()

  const handleSignIn = async () => {
    await signIn()
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }
  return (
    <div className={styles.container}>
      {session?.user ? (
        <>
          <p>{`${session?.user.firstName} ${session?.user.lastName}`}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <button onClick={handleSignIn}>Sign In</button>
          <Link href="/auth/signup">Sign Up</Link>
        </>
      )}
    </div>
  )
}

export { Authorization }
