import React from 'react'

interface IProps {
  params: {
    id: string
  }
}
const Activation: React.FC<IProps> = ({ params }) => {
  return <div>{params.id}</div>
}

export default Activation
