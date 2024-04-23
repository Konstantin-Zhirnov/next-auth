import React from 'react'
import { activateUser } from '@/lib/actions/authActions'

interface IProps {
  params: {
    jwt: string
  }
}
const Activation: React.FC<IProps> = async ({ params }) => {
  const result = await activateUser(params.jwt)
  const getText = () => {
    switch (result) {
      case 'userNotExist':
        return 'The user does not exist'
      case 'alreadyActivated':
        return 'The user is already activated'
      case 'success':
        return 'Success! The user is now activated'
      default:
        return 'Oops! Something went wrong!'
    }
  }
  return (
    <div>
      <p>{getText()}</p>
    </div>
  )
}

export default Activation
