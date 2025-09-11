import React, { useState, useEffect, useRef } from 'react';
import { 
  FaPaperPlane, 
  FaSmile, 
  FaPaperclip, 
  FaMicrophone,
  FaTimes,
  FaEllipsisV,
  FaUser,
  FaUserTie,
  FaCircle,
  FaCheck,
  FaCheckDouble,
  FaRobot
} from 'react-icons/fa';
import './ChatSystem.css';

const ChatSystem = ({ userId = 'mock-user', userName = 'Étudiant' }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [chatMode, setChatMode] = useState('public');
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [showChatInfo, setShowChatInfo] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Chat simplifié en ligne - pas de WebSocket
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      type: 'SYSTEM',
      senderName: 'Système',
      content: '🎉 Bienvenue dans le chat en ligne !',
      timestamp: new Date().toISOString(),
      isAdmin: false
    },
    {
      id: 'admin-1',
      type: 'CHAT',
      senderName: 'Conseiller AI',
      content: 'Bonjour ! Je suis votre conseiller virtuel. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date().toISOString(),
      isAdmin: true
    }
  ]);

  const [activeUsers] = useState([
    { id: 'user-1', name: 'Étudiant', status: 'online', isAdmin: false },
    { id: 'admin-1', name: 'Conseiller AI', status: 'online', isAdmin: true },
    { id: 'user-2', name: 'Marie L.', status: 'online', isAdmin: false },
    { id: 'user-3', name: 'Pierre D.', status: 'away', isAdmin: false }
  ]);

  const [typingUsers, setTypingUsers] = useState([]);

  // Auto-scroll vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Gérer l'envoi de message
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        content: message,
        senderId: userId,
        senderName: userName,
        type: 'CHAT',
        timestamp: new Date().toISOString(),
        isAdmin: false
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      setIsTyping(false);

      // Simuler une réponse automatique après 1-3 secondes
      setTimeout(() => {
        const autoResponse = generateAutoResponse(message);
        if (autoResponse) {
          const responseMessage = {
            id: Date.now().toString() + '-response',
            content: autoResponse,
            senderId: 'admin-1',
            senderName: 'Conseiller AI',
            type: 'CHAT',
            timestamp: new Date().toISOString(),
            isAdmin: true
          };
          setMessages(prev => [...prev, responseMessage]);
        }
      }, 1000 + Math.random() * 2000);
    }
  };

  // Générer des réponses automatiques intelligentes
  const generateAutoResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('bonjour') || lowerMessage.includes('hello') || lowerMessage.includes('salut')) {
      return 'Bonjour ! Ravi de vous rencontrer. Comment puis-je vous aider avec vos études ?';
    }
    
    if (lowerMessage.includes('programme') || lowerMessage.includes('cours') || lowerMessage.includes('formation')) {
      return 'Excellente question ! Nous avons de nombreux programmes disponibles. Voulez-vous explorer une discipline particulière ?';
    }
    
    if (lowerMessage.includes('université') || lowerMessage.includes('école') || lowerMessage.includes('institution')) {
      return 'Nous collaborons avec des universités prestigieuses dans le monde entier. Avez-vous une destination en tête ?';
    }
    
    if (lowerMessage.includes('candidature') || lowerMessage.includes('postuler') || lowerMessage.includes('inscription')) {
      return 'Parfait ! Pour commencer votre candidature, je vous recommande de consulter notre guide étape par étape. Voulez-vous que je vous guide ?';
    }
    
    if (lowerMessage.includes('frais') || lowerMessage.includes('coût') || lowerMessage.includes('prix') || lowerMessage.includes('tarif')) {
      return 'Les frais varient selon le programme et l\'université. Je peux vous aider à trouver des options qui correspondent à votre budget.';
    }
    
    if (lowerMessage.includes('bourse') || lowerMessage.includes('aide') || lowerMessage.includes('financement')) {
      return 'Excellente question ! Nous proposons plusieurs options de bourses et d\'aide financière. Voulez-vous en savoir plus ?';
    }
    
    if (lowerMessage.includes('merci') || lowerMessage.includes('thanks')) {
      return 'De rien ! C\'est un plaisir de vous aider. Avez-vous d\'autres questions ?';
    }
    
    // Réponse par défaut
    const defaultResponses = [
      'Intéressant ! Pouvez-vous me donner plus de détails ?',
      'Je comprends votre question. Laissez-moi vous aider avec cela.',
      'Excellente question ! Laissez-moi vous orienter vers les bonnes ressources.',
      'Je vois ce que vous voulez dire. Comment puis-je vous aider davantage ?'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  // Gérer la frappe
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (!isTyping && e.target.value.length > 0) {
      setIsTyping(true);
      // Simuler l'indicateur de frappe
      setTypingUsers(prev => [...prev.filter(u => u !== userName), userName]);
      
      // Arrêter l'indicateur de frappe après 2 secondes
      setTimeout(() => {
        setIsTyping(false);
        setTypingUsers(prev => prev.filter(u => u !== userName));
      }, 2000);
    } else if (e.target.value.length === 0) {
      setIsTyping(false);
      setTypingUsers(prev => prev.filter(u => u !== userName));
    }
  };

  // Gérer l'envoi avec Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Gérer l'upload de fichier
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileMessage = `📎 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      const newMessage = {
        id: Date.now().toString(),
        content: fileMessage,
        senderId: userId,
        senderName: userName,
        type: 'FILE',
        timestamp: new Date().toISOString(),
        isAdmin: false
      };
      setMessages(prev => [...prev, newMessage]);
    }
    setShowFileUpload(false);
  };

  // Gérer l'enregistrement vocal
  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      console.log('Début de l\'enregistrement vocal (simulation)');
    } else {
      console.log('Fin de l\'enregistrement vocal (simulation)');
      // Simuler l'envoi d'un message vocal
      const voiceMessage = {
        id: Date.now().toString(),
        content: '🎤 Message vocal (simulation)',
        senderId: userId,
        senderName: userName,
        type: 'VOICE',
        timestamp: new Date().toISOString(),
        isAdmin: false
      };
      setMessages(prev => [...prev, voiceMessage]);
    }
  };

  // Changer le mode de chat
  const changeChatMode = (mode) => {
    setChatMode(mode);
    setSelectedRecipient(null);
    if (mode === 'admin') {
      console.log('Mode admin activé (simulation)');
    }
  };

  // Formater la date
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Obtenir l'icône de statut
  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <FaCircle className="status-icon online" />;
      case 'typing':
        return <FaCircle className="status-icon typing" />;
      case 'away':
        return <FaCircle className="status-icon away" />;
      default:
        return <FaCircle className="status-icon offline" />;
    }
  };

  // Obtenir l'icône de type d'utilisateur
  const getUserIcon = (userType) => {
    switch (userType) {
      case 'admin':
        return <FaUserTie className="user-icon admin" />;
      case 'ai':
        return <FaRobot className="user-icon ai" />;
      default:
        return <FaUser className="user-icon student" />;
    }
  };

  // Obtenir l'icône de statut de message
  const getMessageStatusIcon = (message) => {
    if (message.isAdmin) {
      return <FaCheckDouble className="message-status admin" />;
    }
    return <FaCheck className="message-status sent" />;
  };

  // Emojis populaires
  const popularEmojis = ['😊', '👍', '❤️', '🎉', '🔥', '💯', '👏', '🙏', '💪', '🚀'];

  return (
    <div className="chat-system">
      {/* En-tête du chat */}
      <div className="chat-header">
        <div className="chat-info">
          <h3>💬 Chat en Ligne (Mode Simplifié)</h3>
          <div className="connection-status">
            <span className="status-indicator connected">
              🟢 Connecté (Local)
            </span>
            <span className="user-count">{activeUsers.length} utilisateur(s) en ligne</span>
          </div>
        </div>
        <div className="chat-actions">
          <button 
            className={`mode-btn ${chatMode === 'public' ? 'active' : ''}`}
            onClick={() => changeChatMode('public')}
            title="Chat public"
          >
            🌐 Public
          </button>
          <button 
            className={`mode-btn ${chatMode === 'private' ? 'active' : ''}`}
            onClick={() => changeChatMode('private')}
            title="Chat privé"
          >
            🔒 Privé
          </button>
          <button 
            className={`mode-btn ${chatMode === 'admin' ? 'active' : ''}`}
            onClick={() => changeChatMode('admin')}
            title="Support admin"
          >
            👨‍💼 Admin
          </button>
          <button 
            className="info-btn"
            onClick={() => setShowChatInfo(!showChatInfo)}
            title="Informations du chat"
          >
            <FaEllipsisV />
          </button>
        </div>
      </div>

      {/* Informations du chat */}
      {showChatInfo && (
        <div className="chat-info-panel">
          <div className="info-section">
            <h4>📊 Statistiques du Chat</h4>
            <p>Messages envoyés: {messages.length}</p>
            <p>Utilisateurs actifs: {activeUsers.length}</p>
            <p>Mode actuel: {chatMode}</p>
            <p>Statut: Mode local simplifié</p>
          </div>
          <div className="info-section">
            <h4>🔧 Fonctionnalités</h4>
            <p>✅ Chat en temps réel (local)</p>
            <p>✅ Réponses automatiques IA</p>
            <p>✅ Envoi de fichiers</p>
            <p>✅ Enregistrement vocal</p>
          </div>
        </div>
      )}

      {/* Sélection du destinataire pour le chat privé */}
      {chatMode === 'private' && (
        <div className="recipient-selector">
          <label>Sélectionner un destinataire:</label>
          <select 
            value={selectedRecipient?.id || ''} 
            onChange={(e) => {
              const recipient = activeUsers.find(u => u.id === e.target.value);
              setSelectedRecipient(recipient);
            }}
          >
            <option value="">Choisir un utilisateur...</option>
            {activeUsers.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} {user.isAdmin ? '(Admin)' : ''}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Zone des messages */}
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>🎉 Bienvenue dans le chat !</p>
            <p>Commencez à discuter avec d'autres étudiants et conseillers.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={msg.id || index} 
              className={`message ${msg.senderId === userId ? 'own' : 'other'} ${msg.type || 'chat'}`}
            >
              <div className="message-avatar">
                {getUserIcon(msg.isAdmin ? 'admin' : 'student')}
                {getStatusIcon(msg.senderId === userId ? 'online' : 'online')}
              </div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-sender">
                    {msg.senderName || 'Utilisateur'}
                    {msg.isAdmin && <span className="admin-badge">Admin</span>}
                  </span>
                  <span className="message-time">
                    {formatMessageTime(msg.timestamp)}
                  </span>
                </div>
                <div className="message-text">
                  {msg.content}
                </div>
                <div className="message-footer">
                  {getMessageStatusIcon(msg)}
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Indicateur de frappe */}
        {typingUsers.length > 0 && (
          <div className="typing-indicator">
            <span className="typing-text">
              {typingUsers.join(', ')} est en train de taper...
            </span>
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Zone de saisie */}
      <div className="chat-input-area">
        <div className="input-toolbar">
          <button 
            className="toolbar-btn emoji-btn"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Emojis"
          >
            <FaSmile />
          </button>
          <button 
            className="toolbar-btn file-btn"
            onClick={() => setShowFileUpload(!showFileUpload)}
            title="Joindre un fichier"
          >
            <FaPaperclip />
          </button>
          <button 
            className={`toolbar-btn voice-btn ${isRecording ? 'recording' : ''}`}
            onClick={handleVoiceRecord}
            title="Enregistrement vocal"
          >
            <FaMicrophone />
          </button>
        </div>

        {/* Sélecteur d'emojis */}
        {showEmojiPicker && (
          <div className="emoji-picker">
            {popularEmojis.map((emoji, index) => (
              <button
                key={index}
                className="emoji-btn"
                onClick={() => {
                  setMessage(prev => prev + emoji);
                  setShowEmojiPicker(false);
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {/* Zone de saisie principale */}
        <div className="message-input-container">
          <textarea
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={chatMode === 'private' && selectedRecipient 
              ? `Message privé à ${selectedRecipient.name}...`
              : "Tapez votre message..."
            }
            className="message-input"
            rows="3"
          />
          <button 
            className="send-btn"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            title="Envoyer le message"
          >
            <FaPaperPlane />
          </button>
        </div>

        {/* Upload de fichier caché */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
        />
      </div>

      {/* Message d'information sur le mode local */}
      <div className="local-mode-banner">
        <p>💡 Mode local activé - Chat fonctionne sans serveur</p>
        <p>✅ Réponses automatiques IA disponibles</p>
      </div>
    </div>
  );
};

export default ChatSystem;
