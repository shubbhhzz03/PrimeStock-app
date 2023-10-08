import React from 'react'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'

const Dashboard = () => {
  useRedirectLoggedOutUser("/login")
  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
