import path from 'node:path';
import { fileURLToPath } from 'node:url';

import notifier from 'node-notifier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const notificationAlert = description => {
  return notifier.notify({
    title: 'PomoCLI',
    message: description,
    icon: path.join(__dirname, '../assets/icon.png'),
  });
};
