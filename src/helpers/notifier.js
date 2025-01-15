import path from 'node:path';
import { fileURLToPath } from 'node:url';

import notifier from 'node-notifier';

import { playSound } from './playSound.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TODO: Find how i can input a custom sound for windows as well
const useSound = process.platform !== 'linux';

export const notificationAlert = (title, description, status) => {
  return notifier.notify(
    {
      title,
      message: description,
      icon: path.join(__dirname, '../../assets/images/icon.png'),
      sound: useSound,
    },
    () => {
      playSound(status);
    },
  );
};
