import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../api/axios';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api.get('/notifications').then(({ data }) => setNotifications(data.notifications));

    const token = localStorage.getItem('medihire_token');
    if (!token) return;

    const socket = io(import.meta.env.VITE_NOTIFICATION_URL, {
      auth: { token }
    });

    socket.on('notification:new', (payload) => {
      setNotifications((prev) => [payload, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((item) => (
          <div key={item._id} className="bg-white rounded-2xl border p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-slate-600 mt-1">{item.message}</p>
              </div>
              <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">{item.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
