import inquirer from 'inquirer';

import { Pomodoro } from './utils/Pomodoro.js';

const questions = [
  {
    type: 'text',
    message: 'What are you going to do?',
    name: 'activity',
  },
  {
    type: 'number',
    message: 'Focus Time (in minutes):',
    name: 'focus',
  },
  {
    type: 'number',
    message: 'Break Time (in minutes):',
    name: 'pause',
  },
];

async function main() {
  try {
    const answers = await inquirer.prompt(questions);
    const { focus, pause } = answers;

    const pomodoro = new Pomodoro(focus, pause);

    pomodoro.init();
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
