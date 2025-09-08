/**
 * Notification System Component
 * Displays toast notifications for user feedback
 */

import React from 'react';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NotificationSystem = () => {
  const { state, actions } = useApp();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-400" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-400" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-400" />;
      case 'info':
      default:
        return <Info size={20} className="text-blue-400" />;
    }
  };

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20 text-green-100';
      case 'error':
        return 'bg-red-500/10 border-red-500/20 text-red-100';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-100';
      case 'info':
      default:
        return 'bg-blue-500/10 border-blue-500/20 text-blue-100';
    }
  };

  if (state.notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {state.notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            ${getNotificationStyles(notification.type)}
            backdrop-blur-lg border rounded-lg p-4 shadow-lg
            transform transition-all duration-300 ease-in-out
            animate-in slide-in-from-right-full
          `}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {getNotificationIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              {notification.title && (
                <h4 className="text-sm font-semibold mb-1">
                  {notification.title}
                </h4>
              )}
              
              {notification.message && (
                <p className="text-sm opacity-90">
                  {notification.message}
                </p>
              )}
              
              {notification.action && (
                <button
                  onClick={notification.action.onClick}
                  className="mt-2 text-xs underline hover:no-underline opacity-80 hover:opacity-100"
                >
                  {notification.action.label}
                </button>
              )}
            </div>
            
            <button
              onClick={() => actions.removeNotification(notification.id)}
              className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Progress bar for auto-dismiss */}
          <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white/30 rounded-full animate-shrink"
              style={{ animationDuration: '5s' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
