import React from 'react'
import { useLocation } from 'react-router-dom'

const Dashboard = () => {
  const { state } = useLocation()
  console.log(state, 'kkk')
  return (
    <div>
      Hello {state.user.firstName} {state.user.LastName}
    </div>
  )
}

export default Dashboard
