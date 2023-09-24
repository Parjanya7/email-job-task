import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getSocketData } from '../helper';

const socket = io('http://localhost:3100');

export const useSocket = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      const engine = socket.io.engine;
      engine.on('message', message => {
        const data = getSocketData(message);
        if (data) {
          setMessage(data);
        }
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return { message };
};
