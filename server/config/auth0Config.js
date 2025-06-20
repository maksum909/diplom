import { auth } from 'express-oauth2-jwt-bearer'

// Налаштовуємо jwtCheck як завжди
const jwtCheck = auth({
    audience: "https://estatora.online/api",
    issuerBaseURL: "https://dev-rg1xwvj44wl04jbz.us.auth0.com",
    tokenSigningAlg: "RS256"
})

// Обгортаємо middleware логером
const jwtCheckWithLogging = (req, res, next) => {
    console.log("🔐 Incoming Auth Headers:", req.headers)

    // Якщо тобі треба конкретно Authorization заголовок:
    console.log("🔑 Authorization Header:", req.headers.authorization)

    // Далі передаємо управління у реальний middleware
    jwtCheck(req, res, next)
}

export default jwtCheckWithLogging
