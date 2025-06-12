// import React, { useState } from "react";
// import "./AiChat.css";
// import { PuffLoader } from "react-spinners";

// const AiChat = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleSend = async () => {
//         if (!input.trim()) return;

//         const userMessage = { role: "user", content: input };
//         setMessages((prev) => [...prev, userMessage]);
//         setInput("");
//         setLoading(true);

//         try {
//             // Тут мав би бути реальний запит до бота
//             const fakeResponse = {
//                 role: "ai",
//                 content: `Echo: ${input}`,
//             };
//             setTimeout(() => {
//                 setMessages((prev) => [...prev, fakeResponse]);
//                 setLoading(false);
//             }, 800);
//         } catch (err) {
//             setMessages((prev) => [...prev, { role: "ai", content: "Error..." }]);
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="wrapper">
//             <div className="flexColCenter paddings innerWidth ai-chat-container">
//                 <h2>AI Chat</h2>

//                 <div className="ai-chat-box">
//                     {messages.map((msg, i) => (
//                         <div
//                             key={i}
//                             className={`chat-message ${msg.role === "user" ? "user" : "ai"}`}
//                         >
//                             <span>{msg.content}</span>
//                         </div>
//                     ))}

//                     {loading && (
//                         <div className="loader-wrapper">
//                             <PuffLoader size={30} color="#4066ff" />
//                         </div>
//                     )}
//                 </div>

//                 <div className="ai-chat-input">
//                     <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         placeholder="Ask something..."
//                     />
//                     <button className="button" onClick={handleSend}>
//                         Send
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };


import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import './AiChat.css';


const AiChat = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            content: 'Привіт! Я ваш AI-консультант з нерухомості. Розкажіть, яку нерухомість ви шукаєте для оренди? Можу допомогти з вибором за ціною, місцезнаходженням та іншими критеріями. Мова чату - 🇺🇦 Українська',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userLanguage, setUserLanguage] = useState('uk');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const detectLanguage = (text) => {
        // Проста детекція мови на основі кирилиці
        const cyrillicPattern = /[а-яё]/i;
        return cyrillicPattern.test(text) ? 'uk' : 'en';
    };

    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        const detectedLang = detectLanguage(inputValue);
        setUserLanguage(detectedLang);

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('https://145.223.81.31:8000/api/ai-chat/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputValue,
                    language: detectedLang
                }),
            });

            if (!response.ok) {
                throw new Error('Помилка сервера');
            }

            const data = await response.json();

            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: data.response,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Помилка:', error);
            const errorMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: 'Вибачте, сталася помилка. Спробуйте ще раз.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatMessage = (content) => {
        // Обробка лінків в повідомленнях
        const linkRegex = /(https?:\/\/[^\s]+)/g;
        return content.split(linkRegex).map((part, index) => {
            if (part.match(linkRegex)) {
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="message-link"
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <div className="chat-container">
            {/* Header */}
            <div className="chat-header">
                <div className="header-content">
                    <h1 className="header-title">
                        <Bot className="header-icon" />
                        AI real estate consultant
                    </h1>
                    <p className="header-subtitle">
                        Find the perfect property for rent based on your criteria
                    </p>
                </div>
            </div>

            {/* Messages Container */}
            <div className="messages-wrapper">
                <div className="messages-container">
                    <div className="messages-scroll">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`message-row ${message.type === 'user' ? 'message-user' : 'message-bot'}`}
                            >
                                <div className={`message-bubble ${message.type}`}>
                                    <div className="message-content">
                                        {message.type === 'bot' && (
                                            <Bot className="message-avatar bot-avatar" />
                                        )}
                                        {message.type === 'user' && (
                                            <User className="message-avatar user-avatar" />
                                        )}
                                        <div className="message-text">
                                            <div className="message-body">
                                                {formatMessage(message.content)}
                                            </div>
                                            <div className={`message-time ${message.type}`}>
                                                {message.timestamp.toLocaleTimeString('uk-UA', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="message-row message-bot">
                                <div className="message-bubble bot loading">
                                    <div className="message-content">
                                        <Bot className="message-avatar bot-avatar" />
                                        <div className="loading-content">
                                            <Loader2 className="loading-spinner" />
                                            <span className="loading-text">Думаю над відповіддю...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="input-section">
                <div className="input-container">
                    <div className="input-wrapper">
                        <div className="input-group">
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Describe the property you are looking for..."
                                className="message-input"
                                rows="3"
                                disabled={isLoading}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!inputValue.trim() || isLoading}
                                className="send-button"
                            >
                                <Send className="send-icon" />
                            </button>
                        </div>

                        <div className="input-footer">
                            <span className="language-support">Supported languages: Ukrainian and English</span>
                            <span className="current-language">
                                Language:
                                <span className="language-indicator">
                                    {userLanguage === 'uk' ? '🇺🇦 Українська' : '🇺🇸 English'}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiChat;
