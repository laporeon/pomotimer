import path from 'node:path';

import notifier from 'node-notifier';

import INotificationAlert from '@interfaces/INotificationAlert';

import { playSound } from './playSound';

// TODO: Find how i can input a custom sound for windows as well
const useSound = process.platform !== 'linux';

export const notificationAlert = ({
  title,
  description,
  status,
}: INotificationAlert) => {
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
