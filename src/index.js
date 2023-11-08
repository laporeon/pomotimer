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
    name: 'breakTime',
  },
];

async function main() {
  try {
    const answers = await inquirer.prompt(questions);
    const { focus, breakTime } = answers;

    const pom = new Pomodoro(focus, breakTime);

    pom.startFocus();
    console.log('Answers:', answers);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
