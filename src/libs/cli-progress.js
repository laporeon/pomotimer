import chalk from 'chalk';
import cliProgress from 'cli-progress';

export const progressBar = new cliProgress.SingleBar({
  format:
    'Focus ' +
    chalk.cyan('{bar}') +
    ' {percentage}%  {duration_formatted}/{focus_time_formatted}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true,
  stopOnComplete: true,
  synchronousUpdate: true,
  focus_time_formatted: '00:00',
  formatTime: time => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  },
});
