const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const { expressjwt: jwt } = require('express-jwt');
const jwks = require("jwks-rsa")
const axios = require("axios")

dotenv.config()
const app = express()

app.use(cors())

//verify token
const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
}).unless({ path: ['/'] })  //except / route ; mane "/" route chara ar kono route access korte parbe na; unless use na korle "/" aitaw protected hobe;

app.use(verifyJwt)

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

app.get('/protected', (req, res) => {
  res.json({ message: 'Protected route' })
})


app.listen(3000, () => {
  console.log('Server is running on port 3000')
})