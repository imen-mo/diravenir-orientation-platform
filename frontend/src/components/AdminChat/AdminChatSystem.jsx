import React, { useState, useEffect, useRef } from 'react';
import { 
  FaUser, 
  FaPaperPlane, 
  FaSearch, 
  FaFilter, 
  FaTimes, 
  FaPhone,
  FaEnvelope,
  FaVideo,
  FaEllipsisV,
  FaCheck,
  FaClock,
  FaExclamationTriangle,
  FaInfoCircle,
  FaComments,
  FaUserPlus,
  FaArchive,
  FaStar,
  FaTrash,
  FaEdit,
  FaReply,
  FaForward,
  FaDownload,
  FaUpload,
  FaImage,
  FaFile,
  FaSmile,
  FaMicrophone,
  FaVideo as FaVideoCall,
  FaPhone as FaPhoneCall
} from 'react-icons/fa';
import useWebSocket from '../../hooks/useWebSocket';
import './AdminChatSystem.css';

const AdminChatSystem = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Configuration WebSocket pour l'admin
  const adminId = 'admin001';
  const adminName = 'Admin DirAvenir';
  
  const { 
    isConnected, 
    messages, 
    sendPrivateMessage, 
    handleTyping,
    typingUsers: wsTypingUsers 
  } = useWebSocket(adminId, adminName);

  // Données simulées des conversations (en production, récupérer depuis l'API)
  const [conversations, setConversations] = useState([
    {
      id: 1,
      userId: 'user123',
      userName: 'Marie Dupont',
      userEmail: 'marie.dupont@email.com',
      userAvatar: '/api/placeholder/40/40',
      status: 'active',
      lastMessage: 'Bonjour, j\'ai une question sur le programme d\'IA',
      lastMessageTime: '2024-01-25T10:30:00',
      unreadCount: 2,
      priority: 'high',
      tags: ['orientation', 'program'],
      isOnline: true,
      lastSeen: '2024-01-25T10:25:00'
    },
    {
      id: 2,
      userId: 'user456',
      userName: 'Jean Martin',
      userEmail: 'jean.martin@email.com',
      userAvatar: '/api/placeholder/40/40',
      status: 'pending',
      lastMessage: 'Merci pour votre réponse',
      lastMessageTime: '2024-01-25T09:15:00',
      unreadCount: 0,
      priority: 'medium',
      tags: ['application'],
      isOnline: false,
      lastSeen: '2024-01-25T09:10:00'
    },
    {
      id: 3,
      userId: 'user789',
      userName: 'Sophie Bernard',
      userEmail: 'sophie.bernard@email.com',
      userAvatar: '/api/placeholder/40/40',
      status: 'resolved',
      lastMessage: 'Parfait, merci beaucoup !',
      lastMessageTime: '2024-01-24T16:45:00',
      unreadCount: 0,
      priority: 'low',
      tags: ['payment'],
      isOnline: true,
      lastSeen: '2024-01-25T10:20:00'
    },
    {
      id: 4,
      userId: 'user101',
      userName: 'Ahmed Alami',
      userEmail: 'ahmed.alami@email.com',
      userAvatar: '/api/placeholder/40/40',
      status: 'active',
      lastMessage: 'Pouvez-vous m\'aider avec mon application ?',
      lastMessageTime: '2024-01-25T08:30:00',
      unreadCount: 1,
      priority: 'high',
      tags: ['application', 'urgent'],
      isOnline: true,
      lastSeen: '2024-01-25T10:15:00'
    },
    {
      id: 5,
      userId: 'user202',
      userName: 'Fatima Zahra',
      userEmail: 'fatima.zahra@email.com',
      userAvatar: '/api/placeholder/40/40',
      status: 'pending',
      lastMessage: 'J\'ai besoin d\'informations sur les bourses',
      lastMessageTime: '2024-01-24T14:20:00',
      unreadCount: 0,
      priority: 'medium',
      tags: ['scholarship'],
      isOnline: false,
      lastSeen: '2024-01-24T14:15:00'
    }
  ]);

  // Messages simulés pour la conversation active
  const [conversationMessages, setConversationMessages] = useState([
    {
      id: 1,
      senderId: 'user123',
      senderName: 'Marie Dupont',
      content: 'Bonjour, j\'ai une question sur le programme d\'Intelligence Artificielle. Quels sont les prérequis ?',
      timestamp: '2024-01-25T10:30:00',
      type: 'text',
      isRead: true,
      isAdmin: false
    },
    {
      id: 2,
      senderId: 'admin001',
      senderName: 'Admin DirAvenir',
      content: 'Bonjour Marie ! Pour le programme d\'IA, vous devez avoir un baccalauréat en informatique ou dans un domaine connexe, et un niveau d\'anglais B2 minimum.',
      timestamp: '2024-01-25T10:32:00',
      type: 'text',
      isRead: true,
      isAdmin: true
    },
    {
      id: 3,
      senderId: 'user123',
      senderName: 'Marie Dupont',
      content: 'Parfait ! Et pour les frais de scolarité, y a-t-il des bourses disponibles ?',
      timestamp: '2024-01-25T10:35:00',
      type: 'text',
      isRead: true,
      isAdmin: false
    },
    {
      id: 4,
      senderId: 'admin001',
      senderName: 'Admin DirAvenir',
      content: 'Oui, il y a plusieurs options de bourses disponibles. Je vais vous envoyer un document détaillé par email.',
      timestamp: '2024-01-25T10:37:00',
      type: 'text',
      isRead: false,
      isAdmin: true
    }
  ]);

  // Filtrer les conversations
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || conv.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Gérer la sélection d'une conversation
  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation);
    // Marquer les messages comme lus
    setConversations(prev => prev.map(conv => 
      conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv
    ));
  };

  // Envoyer un message
  const handleSendMessage = async () => {
    if (!message.trim() || !activeConversation) return;

    const newMessage = {
      id: Date.now(),
      senderId: adminId,
      senderName: adminName,
      content: message.trim(),
      timestamp: new Date().toISOString(),
      type: 'text',
      isRead: false,
      isAdmin: true
    };

    // Ajouter le message à la conversation locale
    setConversationMessages(prev => [...prev, newMessage]);

    // Envoyer via WebSocket
    try {
      await sendPrivateMessage(activeConversation.userId, message.trim());
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }

    setMessage('');
    setIsTyping(false);
  };

  // Gérer la saisie
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    
    if (!isTyping && e.target.value.length > 0) {
      setIsTyping(true);
      handleTyping(activeConversation?.userId);
    } else if (isTyping && e.target.value.length === 0) {
      setIsTyping(false);
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
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simuler l'upload
      const newMessage = {
        id: Date.now(),
        senderId: adminId,
        senderName: adminName,
        content: `Fichier: ${file.name}`,
        timestamp: new Date().toISOString(),
        type: 'file',
        fileName: file.name,
        fileSize: file.size,
        isRead: false,
        isAdmin: true
      };

      setConversationMessages(prev => [...prev, newMessage]);
    }
  };

  // Gérer les emojis
  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'À l\'instant';
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Hier';
    } else {
      return date.toLocaleDateString('fr-FR');
    }
  };

  // Obtenir la couleur de priorité
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  // Obtenir l'icône de statut
  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <FaCheck className="text-green-500" />;
      case 'pending': return <FaClock className="text-yellow-500" />;
      case 'resolved': return <FaCheck className="text-blue-500" />;
      default: return <FaInfoCircle className="text-gray-500" />;
    }
  };

  // Scroll vers le bas des messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages]);

  // Mettre à jour les utilisateurs en train de taper
  useEffect(() => {
    setTypingUsers(wsTypingUsers);
  }, [wsTypingUsers]);

  return (
    <div className="admin-chat-system">
      <div className="chat-container">
        {/* Sidebar des conversations */}
        <div className="chat-sidebar">
          <div className="sidebar-header">
            <h3>Conversations</h3>
            <div className="header-actions">
              <button className="btn-icon" title="Nouvelle conversation">
                <FaUserPlus />
              </button>
              <button className="btn-icon" title="Archives">
                <FaArchive />
              </button>
            </div>
          </div>

          <div className="search-filters">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Rechercher une conversation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-tabs">
              <button
                className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                Tous ({conversations.length})
              </button>
              <button
                className={`filter-tab ${filterStatus === 'active' ? 'active' : ''}`}
                onClick={() => setFilterStatus('active')}
              >
                Actifs ({conversations.filter(c => c.status === 'active').length})
              </button>
              <button
                className={`filter-tab ${filterStatus === 'pending' ? 'active' : ''}`}
                onClick={() => setFilterStatus('pending')}
              >
                En attente ({conversations.filter(c => c.status === 'pending').length})
              </button>
            </div>
          </div>

          <div className="conversations-list">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`conversation-item ${activeConversation?.id === conversation.id ? 'active' : ''}`}
                onClick={() => handleConversationSelect(conversation)}
              >
                <div className="conversation-avatar">
                  <img src={conversation.userAvatar} alt={conversation.userName} />
                  <div className={`online-indicator ${conversation.isOnline ? 'online' : 'offline'}`}></div>
                </div>

                <div className="conversation-content">
                  <div className="conversation-header">
                    <div className="conversation-name">{conversation.userName}</div>
                    <div className="conversation-time">{formatDate(conversation.lastMessageTime)}</div>
                  </div>

                  <div className="conversation-meta">
                    <div className="conversation-message">{conversation.lastMessage}</div>
                    {conversation.unreadCount > 0 && (
                      <div className="unread-badge">{conversation.unreadCount}</div>
                    )}
                  </div>

                  <div className="conversation-tags">
                    <div
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(conversation.priority) }}
                    >
                      {conversation.priority}
                    </div>
                    {conversation.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                    {getStatusIcon(conversation.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone de chat principale */}
        <div className="chat-main">
          {activeConversation ? (
            <>
              {/* Header de la conversation */}
              <div className="chat-header">
                <div className="user-info">
                  <div className="user-avatar">
                    <img src={activeConversation.userAvatar} alt={activeConversation.userName} />
                    <div className={`online-indicator ${activeConversation.isOnline ? 'online' : 'offline'}`}></div>
                  </div>
                  <div className="user-details">
                    <div className="user-name">{activeConversation.userName}</div>
                    <div className="user-status">
                      {activeConversation.isOnline ? 'En ligne' : `Vu ${formatDate(activeConversation.lastSeen)}`}
                    </div>
                  </div>
                </div>

                <div className="chat-actions">
                  <button className="btn-icon" title="Appel vocal">
                    <FaPhoneCall />
                  </button>
                  <button className="btn-icon" title="Appel vidéo">
                    <FaVideoCall />
                  </button>
                  <button className="btn-icon" title="Envoyer un email">
                    <FaEnvelope />
                  </button>
                  <button className="btn-icon" title="Plus d'options">
                    <FaEllipsisV />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="messages-container">
                <div className="messages-list">
                  {conversationMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`message ${msg.isAdmin ? 'sent' : 'received'}`}
                    >
                      <div className="message-avatar">
                        <img src={msg.isAdmin ? '/api/placeholder/32/32' : activeConversation.userAvatar} alt={msg.senderName} />
                      </div>

                      <div className="message-content">
                        <div className="message-header">
                          <span className="sender-name">{msg.senderName}</span>
                          <span className="message-time">{formatDate(msg.timestamp)}</span>
                        </div>

                        <div className="message-body">
                          {msg.type === 'text' ? (
                            <div className="message-text">{msg.content}</div>
                          ) : msg.type === 'file' ? (
                            <div className="message-file">
                              <FaFile />
                              <div className="file-info">
                                <div className="file-name">{msg.fileName}</div>
                                <div className="file-size">{(msg.fileSize / 1024).toFixed(1)} KB</div>
                              </div>
                              <button className="download-btn">
                                <FaDownload />
                              </button>
                            </div>
                          ) : null}
                        </div>

                        <div className="message-status">
                          {msg.isAdmin && (
                            <span className={`status-icon ${msg.isRead ? 'read' : 'sent'}`}>
                              {msg.isRead ? <FaCheck /> : <FaClock />}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Indicateur de frappe */}
                  {typingUsers.includes(activeConversation.userId) && (
                    <div className="typing-indicator">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span className="typing-text">{activeConversation.userName} est en train d'écrire...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Zone de saisie */}
              <div className="chat-input">
                <div className="input-actions">
                  <button
                    className="btn-icon"
                    onClick={() => fileInputRef.current?.click()}
                    title="Joindre un fichier"
                  >
                    <FaUpload />
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    title="Emojis"
                  >
                    <FaSmile />
                  </button>
                  <button className="btn-icon" title="Enregistrement vocal">
                    <FaMicrophone />
                  </button>
                </div>

                <div className="input-field">
                  <textarea
                    value={message}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Tapez votre message..."
                    rows="1"
                  />
                </div>

                <div className="send-actions">
                  <button
                    className="send-btn"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>

              {/* Picker d'emojis */}
              {showEmojiPicker && (
                <div className="emoji-picker">
                  <div className="emoji-grid">
                    {['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'].map((emoji, index) => (
                      <button
                        key={index}
                        className="emoji-btn"
                        onClick={() => handleEmojiSelect(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="no-conversation">
              <div className="no-conversation-content">
                <FaComments className="no-conversation-icon" />
                <h3>Sélectionnez une conversation</h3>
                <p>Choisissez une conversation dans la liste pour commencer à discuter avec un étudiant.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input caché pour l'upload de fichiers */}
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
      />
    </div>
  );
};

export default AdminChatSystem;
