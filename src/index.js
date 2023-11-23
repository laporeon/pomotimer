#!/usr/bin/env node
import { program } from 'commander';

import { isValidGradientStyle, isValidNumber } from './helpers/validators.js';
import { Pomodoro } from './lib/Pomodoro.js';

program.name('pomotimer').description('A Pomodoro CLI timer.').version('1.0.0');

program
  .option('-f, --focus <value>', 'Focus time in minutes', '25')
  .option('-p, --pause <value>', 'Break time in minutes', '5')
  .option('-t, --title <value>', 'Customize Pomodoro title.', 'Pomotimer')
  .option(
    '-d, --description <value>',
    'Customize notification description.',
    'Congratulations! Session completed.',
  )
  .option('-s, --style <value>', 'Customize CLI text color.', 'morning')

  .action(options => {
    console.log({ options });
    const { focus, pause, title, description, style } = options;

    isValidNumber(focus);
    isValidGradientStyle(style);

    const pomodoro = new Pomodoro(title, focus, pause, description, style);

    pomodoro.init();
  })
  .addHelpText(
    'after',
    `\nExamples:
    $ pomotimer -t "Studying JavaScript"
    $ pomotimer -s "summer"
    $ pomotimer -f 5 -t "Reading" -d "Finished" -s "rainbow"`,
  )
  .showSuggestionAfterError();

program.parse();
