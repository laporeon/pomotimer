import gradient from 'gradient-string';
import ora from 'ora';

import { localTime } from '../helpers/localtime.js';
import { notificationAlert } from '../helpers/notifier.js';

export class Pomodoro {
  constructor(title, focus, description, style) {
    this.title = title;
    this.description = description;
    this.focus = focus;
    this.style = style;
    this.timer = '';
    this.elapsedTime = 0;
    this.focusTimeInSeconds = this.focus * 60;
    this.percentage = 0;
    this.spinner = ora({
      text: `Progress ${this.percentage}% | ${this.format(
        this.elapsedTime,
      )}/${this.format(this.focusTimeInSeconds)}`,
      spinner: 'bouncingBar',
      color: 'yellow',
    });
  }

  start() {
    console.clear();
    console.log(gradient[this.style](`\n${localTime()} | ${this.title}\n`));
    this.spinner.start();
    this.countdown();
  }

  updateProgressValue(value, elapsedTime, totalTime) {
    this.spinner.text = `Progress: ${value}% | ${elapsedTime}/${totalTime}`;
  }

  countdown() {
    this.timer = setInterval(() => {
      if (this.elapsedTime === this.focusTimeInSeconds) {
        return this.stop();
      }
      this.elapsedTime++;

      this.percentage = Math.min(
        100,
        Math.ceil((this.elapsedTime / this.focusTimeInSeconds) * 100),
      );

      this.updateProgressValue(
        this.percentage,
        this.format(this.elapsedTime),
        this.format(this.focusTimeInSeconds),
      );
    }, 1000);
  }

  format(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  }

  stop() {
    console.log('\n');
    this.spinner.succeed(gradient[this.style]('Finished!'));
    clearInterval(this.timer);
    this.notify();
  }

  notify() {
    notificationAlert(this.title, this.description);
  }

  init() {
    this.start();
  }
}
