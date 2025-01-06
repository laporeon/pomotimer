import path from 'node:path';
import { fileURLToPath } from 'node:url';

import notifier from 'node-notifier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const notificationAlert = (title, description) => {
  return notifier.notify({
    title,
    message: description,
    icon: path.join(__dirname, '../../assets/images/icon.png'),
  });
};
