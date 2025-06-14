import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    audience: "https://homyz-estate.xyz/api",
    issuerBaseURL: "https://dev-rg1xwvj44wl04jbz.us.auth0.com",
    tokenSigningAlg: "RS256"
})

export default jwtCheck
