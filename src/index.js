#!/usr/bin/env node
import { program } from 'commander';

import { Pomodoro } from './utils/Pomodoro.js';

program.name('pomotimer').description('A Pomodoro CLI timer.').version('1.0.0');

program
  .option('-f, --focus <value>', 'Focus time in minutes', '25')
  .option(
    '-t, --title <value>',
    'Customize the title for your pomodoro session',
    'Pomotimer',
  )
  .action(options => {
    const { focus, title } = options;

    if (Number.isNaN(+focus) || !Number.isInteger(+focus))
      throw new Error(
        'Please, enter a valid value for your focus session. e.g: 10',
      );

    const pomodoro = new Pomodoro(title, focus);

    pomodoro.init();
  });

program.parse();
