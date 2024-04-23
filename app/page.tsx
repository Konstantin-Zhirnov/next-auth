import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const user = session?.user
  return (
    <div>
      <h1>Welcome to the Doctors app</h1>
      <p>First name {user?.firstName}</p>
      <p>Last name {user?.lastName}</p>
      <p>Phone {user?.phone}</p>
      <p>Email {user?.email}</p>
    </div>
  )
}
