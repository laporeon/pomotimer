import inquirer from 'inquirer';

import { Pomodoro } from './utils/Pomodoro.js';

const questions = [
  {
    type: 'text',
    message: 'What are you going to do?',
    name: 'activity',
    validate: input => {
      if (!input) return 'Please, provide an activity.';
      return true;
    },
  },
  {
    type: 'number',
    message: 'Focus Time (in minutes):',
    name: 'focus',
    default: 25,
  },
  {
    type: 'number',
    message: 'Break Time (in minutes):',
    name: 'pause',
    default: 5,
  },
];

async function main() {
  try {
    const answers = await inquirer.prompt(questions);
    const { activity, focus, pause } = answers;

    const pomodoro = new Pomodoro(activity, focus, pause);

    pomodoro.init();
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
