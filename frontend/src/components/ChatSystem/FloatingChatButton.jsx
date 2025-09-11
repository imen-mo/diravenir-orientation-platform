import React, { useState, useRef, useEffect } from 'react';
import './FloatingChatButton.css';

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Bonjour ! Je suis votre assistant DirAvenir. Comment puis-je vous aider ?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simuler une réponse du bot
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue.trim());
      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    }, 1200);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('bonjour') || input.includes('salut') || input.includes('hello')) {
      return {
        id: Date.now(),
        type: 'bot',
        content: 'Bonjour ! Ravi de vous rencontrer. Je suis là pour vous accompagner dans votre parcours d\'orientation. Que souhaitez-vous savoir ?',
        timestamp: new Date()
      };
    }
    
    if (input.includes('orientation') || input.includes('étudier') || input.includes('formation')) {
      return {
        id: Date.now(),
        type: 'bot',
        content: 'Excellente question ! L\'orientation est cruciale pour votre avenir. Je peux vous aider à explorer les programmes disponibles, comprendre les débouchés, ou vous guider vers les ressources appropriées. Sur quoi aimeriez-vous vous concentrer ?',
        timestamp: new Date()
      };
    }
    
    if (input.includes('programme') || input.includes('cours') || input.includes('matière')) {
      return {
        id: Date.now(),
        type: 'bot',
        content: 'Nous proposons une large gamme de programmes dans différents domaines : sciences, arts, commerce, technologie... Pouvez-vous me dire quel secteur vous intéresse le plus ?',
        timestamp: new Date()
      };
    }
    
    if (input.includes('inscription') || input.includes('admission') || input.includes('candidature')) {
      return {
        id: Date.now(),
        type: 'bot',
        content: 'Pour l\'inscription, vous pouvez utiliser notre formulaire en ligne ou contacter notre équipe d\'admission. Avez-vous des questions spécifiques sur le processus ?',
        timestamp: new Date()
      };
    }
    
    if (input.includes('merci') || input.includes('thanks')) {
      return {
        id: Date.now(),
        type: 'bot',
        content: 'De rien ! C\'est un plaisir de vous aider. N\'hésitez pas à revenir vers moi si vous avez d\'autres questions.',
        timestamp: new Date()
      };
    }
    
    // Réponse par défaut
    return {
      id: Date.now(),
      type: 'bot',
      content: 'Je comprends votre question. Laissez-moi vous orienter vers les bonnes ressources. Pouvez-vous me donner plus de détails sur ce que vous recherchez ?',
      timestamp: new Date()
    };
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  return (
    <div className="floating-chat-button">
      <button 
        className={`chat-toggle ${isOpen ? 'pulse' : ''}`}
        onClick={toggleChat}
        aria-label="Ouvrir le chat"
      >
        💬
      </button>
      
      {isOpen && (
        <div className={`chat-interface-simple ${isOpen ? 'open' : ''}`}>
          <div className="chat-header-simple">
            <h3>Assistant DirAvenir</h3>
            <button 
              className="chat-close-simple"
              onClick={toggleChat}
              aria-label="Fermer le chat"
            >
              ×
            </button>
          </div>
          
          <div className="chat-messages-simple">
            {messages.map((message) => (
              <div key={message.id} className={`message-simple ${message.type}`}>
                <div className="message-content-simple">
                  {message.content}
                </div>
                <div className="message-time-simple">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="typing-indicator-simple">
                <div className="typing-dot-simple"></div>
                <div className="typing-dot-simple"></div>
                <div className="typing-dot-simple"></div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-simple-container">
            <textarea
              ref={inputRef}
              className="chat-input-simple"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message..."
              rows="1"
              disabled={isTyping}
            />
            <button
              className="send-button-simple"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Envoyer le message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatButton;
