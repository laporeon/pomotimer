#!/usr/bin/env node
import { program } from 'commander';

import { isValidGradientStyle, isValidNumber } from './helpers/validators.js';
import { Pomodoro } from './lib/Pomodoro.js';

program.name('pomotimer').description('A Pomodoro CLI timer.').version('1.0.0');

program
  .option('-f, --focus <value>', 'Focus time in minutes', '25')
  .option('-p, --pause <value>', 'Break time in minutes', '5')
  .option('-c, --cycles <value>', 'How many cycles you want do do', '4')
  .option('-t, --title <value>', 'Customize Pomodoro title.', 'Pomotimer')
  .option(
    '-d, --description <value>',
    'Customize notification description.',
    'Congratulations! Session completed.',
  )
  .option('-s, --style <value>', 'Customize CLI text color.', 'morning')

  .action(options => {
    const { focus, pause, cycles, title, description, style } = options;

    isValidNumber([focus, pause, cycles]);
    isValidGradientStyle(style);

    const pomodoro = new Pomodoro(
      title,
      focus,
      pause,
      cycles,
      description,
      style,
    );

    pomodoro.init();
  })
  .addHelpText(
    'after',
    `\nExamples:
    $ pomotimer -t "Studying JavaScript"
    $ pomotimer -s "summer"
    $ pomotimer -f 15 -p 5 -c 2
    $ pomotimer -f 30 -p 10 -c 5 -t "Reading" -d "Finished" -s "rainbow"`,
  )
  .showSuggestionAfterError();

program.parse();
