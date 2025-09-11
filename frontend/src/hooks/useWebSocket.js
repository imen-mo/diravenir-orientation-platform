import { useState, useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const useWebSocket = (userId, userName) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [error, setError] = useState(null);
  
  const stompClient = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  // Configuration WebSocket
  const SOCKET_URL = process.env.REACT_APP_WS_URL || 'http://localhost:8084/ws';
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000;

  // Connexion WebSocket
  const connect = useCallback(() => {
    try {
      const socket = new SockJS(SOCKET_URL);
      stompClient.current = Stomp.over(socket);
      
      // Configuration STOMP
      stompClient.current.configure({
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        reconnectDelay: RECONNECT_DELAY,
        debug: (str) => {
          console.log('WebSocket Debug:', str);
        }
      });

      // Connexion
      stompClient.current.connect(
        {},
        (frame) => {
          console.log('✅ WebSocket connecté:', frame);
          setIsConnected(true);
          setError(null);
          
          // S'abonner aux messages privés
          stompClient.current.subscribe(`/user/${userId}/queue/messages`, (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log('📨 Message reçu:', receivedMessage);
            setMessages(prev => [...prev, receivedMessage]);
          });

          // S'abonner aux messages publics
          stompClient.current.subscribe('/topic/public', (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log('📢 Message public reçu:', receivedMessage);
            setMessages(prev => [...prev, receivedMessage]);
          });

          // S'abonner aux indicateurs de frappe
          stompClient.current.subscribe('/topic/typing', (message) => {
            const typingData = JSON.parse(message.body);
            console.log('⌨️ Frappe détectée:', typingData);
            setTypingUsers(prev => {
              const filtered = prev.filter(user => user.userId !== typingData.userId);
              if (typingData.isTyping) {
                return [...filtered, { userId: typingData.userId, userName: typingData.userName }];
              }
              return filtered;
            });
          });

          // S'abonner aux reçus de lecture
          stompClient.current.subscribe('/topic/read-receipts', (message) => {
            const receiptData = JSON.parse(message.body);
            console.log('✅ Reçu de lecture:', receiptData);
            setMessages(prev => prev.map(msg => 
              msg.id === receiptData.messageId 
                ? { ...msg, isRead: true, readAt: receiptData.readAt }
                : msg
            ));
          });

          // Envoyer le message de connexion
          sendMessage({
            type: 'JOIN',
            senderId: userId,
            senderName: userName,
            content: `${userName} a rejoint le chat`,
            timestamp: new Date().toISOString()
          });

        },
        (error) => {
          console.error('❌ Erreur WebSocket:', error);
          setError('Erreur de connexion WebSocket');
          setIsConnected(false);
          handleReconnect();
        }
      );

    } catch (err) {
      console.error('❌ Erreur lors de la connexion WebSocket:', err);
      setError('Impossible de se connecter au serveur WebSocket');
      setIsConnected(false);
    }
  }, [userId, userName]);

  // Reconnexion automatique
  const handleReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    reconnectTimeoutRef.current = setTimeout(() => {
      console.log('🔄 Tentative de reconnexion...');
      connect();
    }, RECONNECT_DELAY);
  }, [connect]);

  // Envoyer un message
  const sendMessage = useCallback((messageData) => {
    if (!stompClient.current || !isConnected) {
      console.warn('⚠️ WebSocket non connecté');
      return false;
    }

    try {
      const message = {
        ...messageData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };

      // Envoyer le message
      stompClient.current.send('/app/chat.sendMessage', {}, JSON.stringify(message));
      
      // Ajouter le message à la liste locale
      setMessages(prev => [...prev, message]);
      
      console.log('📤 Message envoyé:', message);
      return true;
    } catch (err) {
      console.error('❌ Erreur lors de l\'envoi du message:', err);
      return false;
    }
  }, [isConnected]);

  // Envoyer un message privé
  const sendPrivateMessage = useCallback((content, receiverId) => {
    const messageData = {
      type: 'CHAT',
      senderId: userId,
      senderName: userName,
      receiverId: receiverId,
      content: content,
      messageType: 'TEXT'
    };

    if (!stompClient.current || !isConnected) {
      console.warn('⚠️ WebSocket non connecté');
      return false;
    }

    try {
      const message = {
        ...messageData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };

      // Envoyer le message privé
      stompClient.current.send('/app/chat.sendPrivateMessage', {}, JSON.stringify(message));
      
      // Ajouter le message à la liste locale
      setMessages(prev => [...prev, message]);
      
      console.log('📤 Message privé envoyé:', message);
      return true;
    } catch (err) {
      console.error('❌ Erreur lors de l\'envoi du message privé:', err);
      return false;
    }
  }, [userId, userName, isConnected]);

  // Gérer l'indicateur de frappe
  const handleTyping = useCallback((isTyping = true) => {
    if (!stompClient.current || !isConnected) {
      return false;
    }

    try {
      const typingData = {
        userId: userId,
        userName: userName,
        isTyping: isTyping,
        timestamp: new Date().toISOString()
      };

      stompClient.current.send('/app/chat.typing', {}, JSON.stringify(typingData));
      console.log('⌨️ Indicateur de frappe envoyé:', typingData);
      return true;
    } catch (err) {
      console.error('❌ Erreur lors de l\'envoi de l\'indicateur de frappe:', err);
      return false;
    }
  }, [userId, userName, isConnected]);

  // Marquer un message comme lu
  const markMessageAsRead = useCallback((messageId) => {
    if (!stompClient.current || !isConnected) {
      return false;
    }

    try {
      const receiptData = {
        messageId: messageId,
        readerId: userId,
        readerName: userName,
        readAt: new Date().toISOString()
      };

      stompClient.current.send('/app/chat.markAsRead', {}, JSON.stringify(receiptData));
      console.log('✅ Reçu de lecture envoyé:', receiptData);
      return true;
    } catch (err) {
      console.error('❌ Erreur lors de l\'envoi du reçu de lecture:', err);
      return false;
    }
  }, [userId, userName, isConnected]);

  // Déconnexion
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    if (stompClient.current) {
      // Envoyer le message de déconnexion
      sendMessage({
        type: 'LEAVE',
        senderId: userId,
        senderName: userName,
        content: `${userName} a quitté le chat`,
        timestamp: new Date().toISOString()
      });

      // Déconnecter
      stompClient.current.disconnect(() => {
        console.log('🔌 WebSocket déconnecté');
        setIsConnected(false);
        setMessages([]);
        setTypingUsers([]);
      });
    }
  }, [userId, userName, sendMessage]);

  // Effet de montage
  useEffect(() => {
    connect();

    // Nettoyage lors du démontage
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  // Effet de nettoyage des indicateurs de frappe
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setTypingUsers([]);
    }, 3000);

    return () => clearTimeout(typingTimeout);
  }, [typingUsers]);

  return {
    isConnected,
    messages,
    typingUsers,
    error,
    sendMessage,
    sendPrivateMessage,
    handleTyping,
    markMessageAsRead,
    disconnect,
    connect
  };
};

export default useWebSocket;
