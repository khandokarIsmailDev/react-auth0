const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const axios = require("axios")

dotenv.config()
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

// Middleware to validate Authorization header and extract token
const validateAuthToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const accessToken = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.split(' ')[1] 
      : null

    if (!accessToken) {
      return res.status(400).json({ message: 'Bad Request: Invalid Authorization header format' })
    }

    // Fetch user info using accessToken
    const response = await axios.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    req.user = response.data // Attach user info to request object
    next() // Pass control to the next handler
  } catch (error) {
    console.error('Error in token validation middleware:', error.message)
    return res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Invalid or expired token'
    })
  }
}

// Protected route using middleware
app.get('/protected', validateAuthToken, (req, res) => {
  res.json({ user: req.user })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
