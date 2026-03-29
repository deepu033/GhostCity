import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Add welcome message
      setMessages([
        {
          text: "Hello! I'm your GhostCity Safety Assistant 🛡️. I can help you with safe routes, report unsafe zones, or answer questions about urban safety. What can I help you with?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // First try actual backend
      const response = await fetch("http://localhost:8001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const botMessage = {
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Fallback to mock responses for safety-related queries
      let botResponse = "I'm here to help with safety questions. ";
      
      const messageL = inputMessage.toLowerCase();
      if (messageL.includes('safe') || messageL.includes('route')) {
        botResponse = "I can help you find safer routes! Which area would you like to navigate through? Please provide your starting point and destination.";
      } else if (messageL.includes('report') || messageL.includes('unsafe')) {
        botResponse = "To report an unsafe zone, please provide: 1) Location/address 2) Type of concern (poor lighting, isolated, low crowd, etc.) 3) Time of incident. Your report helps our community stay safer!";
      } else if (messageL.includes('alert') || messageL.includes('notify')) {
        botResponse = "You can enable safety alerts in the 'Alerts' section. Set your location and you'll get instant notifications when entering high-risk zones!";
      } else if (messageL.includes('heatmap') || messageL.includes('map')) {
        botResponse = "The Safety Heatmap shows all reported unsafe zones in your area. Red zones are high-risk, yellow zones are moderate, and green zones are safe. You can toggle between day and night views!";
      } else if (messageL.includes('how does it work') || messageL.includes('how it works')) {
        botResponse = "GhostCity Alert works by: 1) Crowd-sourced anonymous reports of unsafe areas 2) AI analysis of patterns and risk scores 3) Real-time heatmaps showing day/night safety levels 4) Safe route recommendations to avoid dead zones";
      } else if (messageL.includes('women') || messageL.includes('vulnerable')) {
        botResponse = "GhostCity Alert is designed for everyone - especially women, night-shift workers, delivery agents, and students. Our mission is to make navigation safer for vulnerable groups through collective intelligence.";
      } else if (messageL.includes('privacy')) {
        botResponse = "Your privacy is our priority! All reports are completely anonymous. We don't store personal location data and use advanced aggregation to protect individual identity while maintaining data integrity.";
      } else {
        botResponse = "Great question! I can help with: 1) Finding safe routes 2) Reporting unsafe zones 3) Understanding the heatmap 4) Setting up alerts 5) Learning about safety features. What would you like to know?";
      }

      const botMessage = {
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Icon Button */}
      <button
        className={`chatbot-icon ${isOpen ? "open" : ""}`}
        onClick={toggleChat}
        aria-label="Toggle chatbot"
      >
        {isOpen ? "✕" : "🛡️"}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <h3>GhostCity Safety Assistant</h3>
            <button className="close-btn" onClick={toggleChat}>
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                <div className="message-content">
                  <p>{msg.text}</p>
                  <span className="message-time">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot-message">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about safe routes, report unsafe zones..."
              rows="1"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="send-btn"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
