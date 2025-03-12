import { useState } from 'react';
import { Bell, Droplet, Bed, CircleAlert, X } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'blood_request' | 'bed_available' | 'alert';
  message: string;
  timestamp: string;
  read: boolean;
}

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'blood_request',
      message: 'Urgent need for O- blood at City General Hospital',
      timestamp: '2024-03-15T14:30:00Z',
      read: false
    },
    {
      id: '2',
      type: 'bed_available',
      message: '5 ICU beds now available at Metro Healthcare',
      timestamp: '2024-03-15T14:15:00Z',
      read: true
    },
    {
      id: '3',
      type: 'alert',
      message: 'Blood donation camp happening tomorrow at Central Park',
      timestamp: '2024-03-15T13:45:00Z',
      read: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative group">
      <button 
        className="p-2 hover:bg-gray-100 rounded-full relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Bell className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
        )}
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900">Notifications</h3>
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Mark all as read
              </button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    {notification.type === 'blood_request' ? (
                      <Droplet className="h-5 w-5 text-red-500" />
                    ) : notification.type === 'bed_available' ? (
                      <Bed className="h-5 w-5 text-green-500" />
                    ) : (
                      <CircleAlert className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.timestamp).toLocaleDateString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: 'numeric',
                        month: 'short'
                      })}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="ml-2">
                      <span className="h-2 w-2 bg-blue-500 rounded-full inline-block"></span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 text-center bg-gray-50">
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 