import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaPaperPlane, FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import useWebSocket from '../../hooks/useWebSocket';
import './AdminChatInterface.css';

const AdminChatInterface = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const messagesEndRef = useRef(null);

  // Utiliser le hook WebSocket pour l'admin
  const adminId = 'admin001';
  const adminName = 'Admin DirAvenir';
  
  const { 
    isConnected, 
    messages, 
    sendPrivateMessage, 
    handleTyping,
    typingUsers 
  } = useWebSocket(adminId, adminName);

  // Données simulées des conversations (en production, récupérer depuis l'API)
  const conversations = [
    {
      id: 1,
      userId: 'user123',
      userName: 'Marie Dupont',
      userEmail: 'marie.dupont@email.com',
      status: 'active',
      lastMessage: 'Bonjour, j\'ai une question sur le programme d\'IA',
      lastMessageTime: '2024-01-25T10:30:00',
      unreadCount: 2
    },
    {
      id: 2,
      userId: 'user456',
      userName: 'Jean Martin',
      userEmail: 'jean.martin@email.com',
      status: 'pending',
      lastMessage: 'Merci pour votre réponse',
      lastMessageTime: '2024-01-25T09:15:00',
      unreadCount: 0
    },
    {
      id: 3,
      userId: 'user789',
      userName: 'Sophie Bernard',
      userEmail: 'sophie.bernard@email.com',
      status: 'resolved',
      lastMessage: 'Parfait, merci beaucoup !',
      lastMessageTime: '2024-01-24T16:45:00',
      unreadCount: 0
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || conv.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation, messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !activeConversation) return;

    // Envoyer le message privé à l'utilisateur
    sendPrivateMessage(message, activeConversation.userId);
    
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#FCBE1C';
      case 'pending': return '#6B7280';
      case 'resolved': return '#059669';
      default: return '#6B7280';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'pending': return 'En attente';
      case 'resolved': return 'Résolu';
      default: return 'Inconnu';
    }
  };

  // Filtrer les messages pour la conversation active
  const conversationMessages = messages.filter(msg => 
    msg.conversationId === `conv_${activeConversation?.userId}` ||
    (msg.recipientId === activeConversation?.userId && msg.admin)
  );

  return (
    <div className="admin-chat-container">
      <div className="chat-content">
        <div className="conversations-sidebar">
          <div className="search-filters">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-dropdown">
              <FaFilter className="filter-icon" />
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">Tous les statuts</option>
                <option value="active">Active</option>
                <option value="pending">En attente</option>
                <option value="resolved">Résolu</option>
              </select>
            </div>
          </div>

          <div className="conversations-list">
            {filteredConversations.map(conversation => (
              <div
                key={conversation.id}
                className={`conversation-item ${activeConversation?.id === conversation.id ? 'active' : ''}`}
                onClick={() => setActiveConversation(conversation)}
              >
                <div className="conversation-avatar">
                  <FaUser />
                </div>
                <div className="conversation-info">
                  <div className="conversation-header">
                    <h4>{conversation.userName}</h4>
                    <span 
                      className="status-indicator"
                      style={{ backgroundColor: getStatusColor(conversation.status) }}
                      title={getStatusLabel(conversation.status)}
                    />
                  </div>
                  <p className="conversation-preview">{conversation.lastMessage}</p>
                  <div className="conversation-meta">
                    <span className="conversation-time">
                      {new Date(conversation.lastMessageTime).toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    {conversation.unreadCount > 0 && (
                      <span className="unread-badge">{conversation.unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-main">
          {activeConversation ? (
            <>
              <div className="chat-user-info">
                <div className="user-details">
                  <h3>{activeConversation.userName}</h3>
                  <p>{activeConversation.userEmail}</p>
                  <span 
                    className="user-status"
                    style={{ backgroundColor: getStatusColor(activeConversation.status) }}
                  >
                    {getStatusLabel(activeConversation.status)}
                  </span>
                  <span className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
                    {isConnected ? '🟢 WebSocket connecté' : '🔴 WebSocket déconnecté'}
                  </span>
                </div>
              </div>

              <div className="messages-container">
                {conversationMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`message ${msg.admin ? 'admin-message' : 'user-message'}`}
                  >
                    <div className="message-header">
                      <span className="sender-name">{msg.senderName}</span>
                      <span className="message-time">
                        {new Date(msg.timestamp).toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <div className="message-content">{msg.content}</div>
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

              <div className="message-input">
                <textarea
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
            </>
          ) : (
            <div className="no-conversation">
              <FaUser className="no-conversation-icon" />
              <h3>Sélectionnez une conversation</h3>
              <p>Choisissez un utilisateur dans la liste pour commencer à discuter</p>
              <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
                {isConnected ? '🟢 WebSocket connecté' : '🔴 WebSocket déconnecté'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChatInterface;
