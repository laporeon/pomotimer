import path from 'node:path';
import { fileURLToPath } from 'node:url';

import notifier from 'node-notifier';

import { playSound } from './playSound.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TODO: test the sound is being played on both windows and linux

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
