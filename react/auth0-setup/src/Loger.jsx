
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function Logger() {

  const {
    loginWithPopup,
    isAuthenticated,
    user,
    isLoading,
    error,
    loginWithRedirect,
    logout,
  } = useAuth0()

  return (
    <div>
      <h1>Logger</h1>
      <button onClick={() => loginWithPopup()}>Login with Popup</button>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => loginWithRedirect()}>Login with Redirect</button>
    </div>
  )
}