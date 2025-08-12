import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSignOutAlt, FaTimes } from 'react-icons/fa';

const LogoutConfirmation = ({ isOpen, onClose, onConfirm, loading = false, isLogoutAll = false }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FaSignOutAlt className="text-red-600 text-lg" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {isLogoutAll ? 'Confirmer la déconnexion globale' : 'Confirmer la déconnexion'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-gray-600">
              {isLogoutAll 
                ? 'Êtes-vous sûr de vouloir vous déconnecter de tous vos appareils ? Cette action invalidera toutes vos sessions actives.'
                : 'Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à votre compte.'
              }
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Déconnexion...
                </>
              ) : (
                <>
                  <FaSignOutAlt />
                  Se déconnecter
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LogoutConfirmation;
