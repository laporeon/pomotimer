import path from 'node:path';
import { fileURLToPath } from 'node:url';

import notifier from 'node-notifier';

import { playSound } from './playSound.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const notificationAlert = (title, description, status) => {
  return notifier.notify(
    {
      title,
      message: description,
      icon: path.join(__dirname, '../../assets/images/icon.png'),
      sound: false,
    },
    err => {
      if (err) {
        console.error('Erro ao enviar a notificação:', err.message);
      } else {
        playSound(status);
      }
    },
  );
};
