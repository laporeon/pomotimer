#!/usr/bin/env node
import { program } from 'commander';

import { isValidNumber } from '@helpers/validators';
import { Pomodoro } from '@lib/Pomodoro';

program.name('pomotimer').description('A Pomodoro CLI timer.').version('1.0.0');

program
  .option('-f, --focus <value>', 'Focus time in minutes', '25')
  .option('-p, --pause <value>', 'Break time in minutes', '5')
  .option('-c, --cycles <value>', 'How many cycles you want do do', '4')
  .option('-t, --title <value>', 'Customize Pomodoro title.', 'Pomotimer')
  .action(settings => {
    let { focus, pause, cycles, title } = settings;

    isValidNumber([focus, pause, cycles]);

    const pomodoro = new Pomodoro({ title, focus, pause, cycles });

    pomodoro.init();
  })
  .addHelpText(
    'after',
    `\nExamples:
    $ pomotimer -t "Studying JavaScript"
    $ pomotimer -f 15 -p 5 -c 2
    $ pomotimer -f 30 -p 10 -c 5 -t "Reading"`,
  )
  .showSuggestionAfterError();

program.parse();
