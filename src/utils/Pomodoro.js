// import { focusProgressBar, breakProgressBar } from '../libs/cli-progress.js';
import { progressBar } from '../libs/cli-progress.js';
import { notificationAlert } from '../libs/notifier.js';

export class Pomodoro {
  constructor(focus, pause) {
    this.focus = focus;
    this.breakTime = pause;
    this.timer = '';
    this.type = 'Focus';
    this.value = 0;
    this.elapsedTime = 0;
    this.focusTimeInSeconds = this.focus * 60;
    this.breakTimeInSeconds = this.breakTime * 60;
    this.progressBar = progressBar;
    this.currentTime = this.focusTimeInSeconds;
  }

  startFocus() {
    this.createProgressBar();
    this.countdown();
  }

  startBreak() {
    this.type = 'Break';
    this.currentTime = this.breakTimeInSeconds;
    this.value = 0;
    this.elapsedTime = 0;

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

    if (this.type === 'Focus') {
      notificationAlert(
        'Focus time is over. Break time is going to start in 10s.',
      );

      setTimeout(() => {
        notificationAlert('Time to take a break!');
        this.startBreak();
      }, 10000);
    }
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

  init() {
    this.startFocus();
  }
}
