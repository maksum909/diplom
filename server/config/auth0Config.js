import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    audience: "http://145.223.81.31:8000/",
    issuerBaseURL: "https://dev-rg1xwvj44wl04jbz.us.auth0.com/",
    tokenSigningAlg: "RS256"
})

export default jwtCheck
