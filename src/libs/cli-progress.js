import chalk from 'chalk';
import cliProgress from 'cli-progress';

export const progressBar = new cliProgress.SingleBar({
  format:
    '{type} Time [' +
    chalk.yellow('{bar}]') +
    ' {percentage}%  {elapsed_time}/{total_time}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true,
  stopOnComplete: true,
  synchronousUpdate: true,
  elapsed_time: '00:00',
  total_time: '00:00',
  type: '',
});
