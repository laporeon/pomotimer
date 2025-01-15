import { exec } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const platform = process.platform;

export const playSound = (status = 'completed') => {
  let soundPath = path.join(__dirname, '../../assets/sounds/complete');

  if (status !== 'completed') {
    soundPath = path.join(__dirname, '../../assets/sounds/ding');
  }

  const linuxCmd = `paplay ${soundPath}.ogg`;

  return exec(linuxCmd);
};
