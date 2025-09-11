import React, { useState, useRef, useEffect } from 'react';
import { FaComments, FaPaperPlane, FaTimes, FaUser } from 'react-icons/fa';
import useWebSocket from '../../hooks/useWebSocket';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Utiliser le hook WebSocket
  const userId = 'user123'; // En production, récupérer depuis l'auth
  const userName = 'Utilisateur'; // En production, récupérer depuis l'auth
  
  const { 
    isConnected, 
    messages, 
    sendMessage, 
    handleTyping,
    typingUsers 
  } = useWebSocket(userId, userName);

  // Salutation intelligente selon l'heure
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bonjour ! Comment puis-je vous aider ?";
    if (hour < 18) return "Bon après-midi ! Comment puis-je vous aider ?";
    return "Bonsoir ! Comment puis-je vous aider ?";
  };

  // Message de bienvenue automatique
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        content: getGreeting(),
        sender: 'admin',
        timestamp: new Date().toISOString(),
        admin: true
      };
      // Le message de bienvenue sera géré par le serveur WebSocket
    }
  }, [isOpen, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Envoyer le message via WebSocket
    sendMessage(message);
    
    // Vider l'input
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    // Envoyer l'indicateur de frappe
    handleTyping();
  };

  return (
    <>
      <button 
        className="chat-widget-button"
        onClick={() => setIsOpen(true)}
        aria-label="Ouvrir le chat"
      >
        <FaComments />
        <span className="chat-notification">💬</span>
        {!isConnected && <span className="connection-indicator offline">🔴</span>}
        {isConnected && <span className="connection-indicator online">🟢</span>}
      </button>

      {isOpen && (
        <div className="chat-widget-overlay">
          <div className="chat-widget-interface">
            <div className="chat-header">
              <div className="chat-title">
                <FaUser className="chat-icon" />
                <h3>Support DirAvenir</h3>
                <span className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
                  {isConnected ? '🟢 Connecté' : '🔴 Déconnecté'}
                </span>
              </div>
              <button 
                className="chat-close"
                onClick={() => setIsOpen(false)}
                aria-label="Fermer le chat"
              >
                <FaTimes />
              </button>
            </div>

            <div className="chat-messages">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`message ${msg.admin ? 'admin-message' : 'user-message'}`}
                >
                  <div className="message-content">{msg.content}</div>
                  <div className="message-time">
                    {new Date(msg.timestamp).toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              ))}
              
              {/* Indicateurs de frappe */}
              {typingUsers.length > 0 && (
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <span className="typing-text">
                    {typingUsers.join(', ')} {typingUsers.length === 1 ? 'est' : 'sont'} en train de taper...
                  </span>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-container">
              <textarea
                className="chat-input"
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                rows="3"
                disabled={!isConnected}
              />
              <button 
                className="send-button"
                onClick={handleSendMessage}
                disabled={!message.trim() || !isConnected}
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

export default ChatWidget;
