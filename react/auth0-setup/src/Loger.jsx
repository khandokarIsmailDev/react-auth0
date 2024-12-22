
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

  async function callApi() {
    const response = await fetch('http://localhost:3000/')
    const data = await response.json()
    console.log(data)
  }

  async function callApiProtected() {
    const response = await fetch('http://localhost:3000/protected')
    const data = await response.json()
    console.log(data)
  }

  return (
    <div>
      <h1>Logger</h1>
      <button onClick={() => loginWithPopup()}>Login with Popup</button>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => loginWithRedirect()}>Login with Redirect</button>

      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <ul>
          <li>
            <button onClick={callApi}>call api route</button>
          </li>
          <li>
            <button onClick={callApiProtected}>Call api protected route</button>
          </li>
          
        </ul>
      </div>

      <h2>User</h2>
      <p>{isAuthenticated ? 'Logged in' : 'not logged in'}</p>
      <p>{isLoading ? 'Loading...' : ''}</p>
      <p>{error ? 'Error: ' + error.message : ''}</p>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}