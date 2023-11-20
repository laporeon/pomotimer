import gradient from 'gradient-string';

import { progressBar } from '../libs/cli-progress.js';
import { notificationAlert } from '../libs/notifier.js';
import { localTime } from './localtime.js';

export class Pomodoro {
  constructor(title, focus, description) {
    this.title = title ?? 'Pomotimer';
    this.description = description ?? 'Congratulations! Session completed.';
    this.focus = focus;
    this.timer = '';
    this.type = 'Focus';
    this.value = 0;
    this.elapsedTime = 0;
    this.focusTimeInSeconds = this.focus * 60;
    this.progressBar = progressBar;
    this.currentTime = this.focusTimeInSeconds;
  }

  start() {
    console.log(gradient.morning(`\n${localTime()} | ${this.title}\n`));
    this.createProgressBar();
    this.countdown();
  }

  countdown() {
    this.timer = setInterval(() => {
      if (this.elapsedTime === this.currentTime) {
        return this.stop();
      }

      this.elapsedTime++;
      this.updateProgressBar();
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
    this.progressBar.stop();
    clearInterval(this.timer);
    this.notify();
    console.log(gradient.morning(`\nFinished!`));
  }

  createProgressBar() {
    this.progressBar.start(this.currentTime, 0, {
      speed: 'N/A',
      elapsed_time: this.format(this.elapsedTime),
      total_time: this.format(this.currentTime),
      type: this.type,
    });
  }

  updateProgressBar() {
    this.value++;
    this.progressBar.update(this.value, {
      elapsed_time: this.format(this.elapsedTime),
    });
  }

  notify() {
    notificationAlert(this.title, this.description);
  }

  init() {
    this.start();
  }
}
