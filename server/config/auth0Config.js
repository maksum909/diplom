import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    audience: "https://estatora.online",
    issuerBaseURL: "https://dev-rg1xwvj44wl04jbz.us.auth0.com",
    tokenSigningAlg: "RS256"
})

export default jwtCheck
