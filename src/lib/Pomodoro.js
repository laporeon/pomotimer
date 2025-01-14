import gradient, { cristal } from 'gradient-string';
import ora from 'ora';

import { localTime } from '../helpers/localtime.js';
import { notificationAlert } from '../helpers/notifier.js';

export class Pomodoro {
  constructor(title, focus, pause, cycles) {
    this.title = title;
    this.focus = focus;
    this.breakTime = pause;
    this.cycles = cycles;
    this.timer = '';
    this.elapsedTime = 0;
    this.focusTimeInSeconds = this.focus * 60;
    this.breakTimeInSeconds = this.breakTime * 60;
    this.currentTime = this.focusTimeInSeconds;
    this.percentage = 0;
    this.type = 'Focus';
    this.spinner = '';
    this.index = 1;
  }

  start() {
    this.createSpinner();
    this.countdown();
  }

  stop() {
    clearInterval(this.timer);
    this.notify();
  }

  countdown() {
    this.timer = setInterval(() => {
      if (this.elapsedTime === this.currentTime) {
        return this.stop();
      }

      this.elapsedTime++;
      this.updateSpinner();
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

  notify() {
    if (this.type === 'Focus') {
      notificationAlert(this.title, 'Time to take a break!', 'focus');

      this.type = 'Break';
      this.currentTime = this.breakTimeInSeconds;
      this.value = 0;
      this.elapsedTime = 0;
      this.percentage = 0;
      this.spinner.succeed();

      return this.start();
    }

    if (this.type === 'Break' && this.index < this.cycles) {
      notificationAlert(this.title, 'Break is over. Time to focus!', 'break');

      this.index++;
      this.type = 'Focus';
      this.currentTime = this.focusTimeInSeconds;
      this.value = 0;
      this.elapsedTime = 0;
      this.percentage = 0;
      this.spinner.succeed();

      return this.start();
    }

    this.spinner.succeed();
    console.log(cristal('\nFinished!'));
    return notificationAlert(this.title, 'Congratulations, Pomodoro finished!');
  }

  createSpinner() {
    this.spinner = ora({
      text: `${this.type} [${this.index}/${this.cycles}]: ${
        this.percentage
      }% | ${this.format(this.elapsedTime)}/${this.format(this.currentTime)}`,
      spinner: 'bouncingBar',
      color: 'green',
    });

    return this.spinner.start();
  }

  updateSpinner() {
    this.percentage = Math.min(
      100,
      Math.ceil((this.elapsedTime / this.currentTime) * 100),
    );

    const elapsedTimeFormatted = this.format(this.elapsedTime);
    const totalTimeFormatted = this.format(this.currentTime);

    this.spinner.text = `${this.type} [${this.index}/${this.cycles}]: ${this.percentage}% | ${elapsedTimeFormatted}/${totalTimeFormatted}`;
  }

  init() {
    console.clear();
    console.log(cristal(`\n${localTime()} | ${this.title}\n`));
    this.start();
  }
}
