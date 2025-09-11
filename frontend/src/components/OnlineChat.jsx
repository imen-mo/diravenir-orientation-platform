import React, { useState, useEffect, useRef } from 'react';
import './OnlineChat.css';
import { 
  FaComments, 
  FaTimes, 
  FaPaperPlane, 
  FaUser, 
  FaRobot,
  FaEllipsisV,
  FaPhone,
  FaVideo
} from 'react-icons/fa';

const OnlineChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Messages simulés
  const initialMessages = [
    {
      id: 1,
      text: "Bonjour ! Je suis là pour vous aider avec vos questions sur les applications et tests.",
      sender: 'support',
      timestamp: new Date(Date.now() - 300000),
      type: 'text'
    },
    {
      id: 2,
      text: "Comment puis-je vous assister aujourd'hui ?",
      sender: 'support',
      timestamp: new Date(Date.now() - 240000),
      type: 'text'
    }
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simulation de réponse automatique
      setIsTyping(true);
      setTimeout(() => {
        const responses = [
          "Merci pour votre message. Je vais vous aider avec cela.",
          "C'est une excellente question. Laissez-moi vous expliquer...",
          "Je comprends votre préoccupation. Voici ce que je peux vous dire...",
          "Parfait ! Je vais vous guider à travers ce processus.",
          "Excellente question ! Voici les informations que vous cherchez..."
        ];

        const response = {
          id: messages.length + 2,
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'support',
          timestamp: new Date(),
          type: 'text'
        };

        setMessages(prev => [...prev, response]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const quickActions = [
    { text: "Aide avec les applications", action: "Je peux vous aider avec vos applications universitaires." },
    { text: "Questions sur les tests", action: "Je peux vous expliquer le processus des tests d'orientation." },
    { text: "Statut de candidature", action: "Je peux vérifier le statut de vos candidatures." },
    { text: "Problème technique", action: "Je peux vous aider à résoudre des problèmes techniques." }
  ];

  const handleQuickAction = (action) => {
    setNewMessage(action);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className={`chat-toggle ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <FaComments className="chat-icon" />
        {!isOpen && <span className="chat-badge">1</span>}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="support-avatar">
                <FaRobot />
              </div>
              <div className="support-info">
                <h3>Support Diravenir</h3>
                <span className="status">En ligne</span>
              </div>
            </div>
            <div className="chat-header-actions">
              <button className="action-btn">
                <FaPhone />
              </button>
              <button className="action-btn">
                <FaVideo />
              </button>
              <button className="action-btn">
                <FaEllipsisV />
              </button>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={`${message.id}-${index}`} className={`message ${message.sender}`}>
                <div className="message-avatar">
                  {message.sender === 'user' ? <FaUser /> : <FaRobot />}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    <p>{message.text}</p>
                    <span className="message-time">{formatTime(message.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message support">
                <div className="message-avatar">
                  <FaRobot />
                </div>
                <div className="message-content">
                  <div className="message-bubble typing">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-quick-actions">
            <h4>Actions rapides :</h4>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="quick-action-btn"
                  onClick={() => handleQuickAction(action.action)}
                >
                  {action.text}
                </button>
              ))}
            </div>
          </div>

          <div className="chat-input">
            <div className="input-container">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                rows="1"
                className="message-input"
              />
              <button 
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OnlineChat;
