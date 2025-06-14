
import { prisma } from "../config/prismaConfig.js";
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config()


// Ініціалізація Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Приклад даних будівель для оренди
const buildingsData = [];

async function fetchResidencies() {
    try {
        const residencies = await prisma.residency.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        const residenciesForResponse = residencies.map(r => ({
            ...r,
            price: r.price.toString(),
        }));

        buildingsData.push(...residenciesForResponse);

        console.log("Loaded residencies:", buildingsData.length);
    } catch (err) {
        console.error("Error fetching residencies:", err);
    }
}

function createSystemPrompt(language, buildingsData) {
    const prompts = {
        uk: `Ти - експертний консультант з нерухомості. Твоє завдання допомагати клієнтам знайти ідеальну нерухомість для оренди.

    ДОСТУПНА НЕРУХОМІСТЬ:
    ${JSON.stringify(buildingsData, null, 2)}

    ПРАВИЛА:
    1. Завжди відповідай українською мовою
    2. Аналізуй потреби клієнта (бюджет, локація, опис, кількість кімнат)
    3. Рекомендуй найбільш підходящі варіанти
    4. Для кожної рекомендації ОБОВ'ЯЗКОВО додавай пряме посилання створене з домену https://homyz-estate.xyz/properties/ в кінці айді запису
    5. Порівнюй варіанти за ціною та локацією
    6. Враховуй додаткові зручності
    7. Будь дружелюбним та корисним
    8. Якщо клієнт не вказав конкретні критерії, запитай деталі

    ФОРМАТ ВІДПОВІДІ:
    - Коротке вступне речення
    - Рекомендації з описом та лінками
    - Порівняння переваг
    - Запитання для уточнення (за потреби)`,

            en: `You are an expert real estate consultant. Your task is to help clients find perfect rental properties.

    AVAILABLE PROPERTIES:
    ${JSON.stringify(buildingsData, null, 2)}

    RULES:
    1. Always respond in English
    2. Analyze client needs (budget, location, area, number of rooms)
    3. Recommend the most suitable options
    4. For each recommendation MANDATORY include direct link from "link" field
    5. Compare options by price and location
    6. Consider additional amenities
    7. Be friendly and helpful
    8. If client doesn't specify criteria, ask for details

    RESPONSE FORMAT:
    - Brief introduction
    - Recommendations with descriptions and links
    - Comparison of advantages
    - Follow-up questions (if needed)`
    };

    return prompts[language] || prompts.en;
}

export const aiChat = async (req, res) => {
    try {
        // Отримання даних з запиту
        const { message, language = 'uk' } = req.body;

        // Валідація вхідних даних
        if (!message) {
            return res.status(400).json({
                error: 'Message is required',
                timestamp: new Date().toISOString()
            });
        }

        // Перевірка наявності API ключа
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                error: 'Gemini API key is not configured',
                timestamp: new Date().toISOString()
            });
        }

        // Додаткова валідація повідомлення
        if (typeof message !== 'string' || message.trim().length < 2) {
            return res.status(400).json({
                error: 'Message must be a valid string with at least 2 characters',
                timestamp: new Date().toISOString()
            });
        }

        if (message.length > 1000) {
            return res.status(400).json({
                error: 'Message is too long (max 1000 characters)',
                timestamp: new Date().toISOString()
            });
        }

        // Створення контексту для AI
        const buildingsData = await fetchResidencies();
        const systemPrompt = createSystemPrompt(language, buildingsData);
        const fullPrompt = `${systemPrompt}\n\nКЛІЄНТ: ${message}\n\nВІДПОВІДЬ:`;

        console.log(fullPrompt);

        // Генерація відповіді через Gemini
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const aiResponse = response.text();

        // Логування для дебагу
        console.log('=== AI Chat Request ===');
        console.log('User message:', message);
        console.log('Language:', language);
        console.log('Response length:', aiResponse.length);
        console.log('Timestamp:', new Date().toISOString());
        console.log('IP:', req.ip);

        // Успішна відповідь
        res.json({
            response: aiResponse,
            language: language,
            timestamp: new Date().toISOString(),
            messageId: Date.now(),
            status: 'success'
        });

    } catch (error) {
        // Детальне логування помилок
        console.error('=== AI Chat Error ===');
        console.error('Error:', error.message);
        console.error('Stack:', error.stack);
        console.error('Timestamp:', new Date().toISOString());
        console.error('Request body:', req.body);

        // Створення відповіді про помилку залежно від мови
        const { language = 'uk' } = req.body;
        const errorMessage = language === 'uk'
            ? 'Вибачте, сталася помилка при обробці вашого запиту. Спробуйте ще раз.'
            : 'Sorry, an error occurred while processing your request. Please try again.';

        // Відправка помилки клієнту
        res.status(500).json({
            error: errorMessage,
            details: process.env.NODE_ENV === 'development' ? error.message : undefined,
            timestamp: new Date().toISOString(),
            status: 'error'
        });
    }
};
