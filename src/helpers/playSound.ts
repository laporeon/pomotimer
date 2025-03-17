import { exec } from 'node:child_process';
import path from 'node:path';

export const playSound = (status: string = 'completed') => {
  let soundPath = path.join(__dirname, '../../assets/sounds/complete');

  if (status !== 'completed') {
    soundPath = path.join(__dirname, '../../assets/sounds/ding');
  }

  const linuxCmd = `paplay ${soundPath}.ogg`;

  return exec(linuxCmd);
};
