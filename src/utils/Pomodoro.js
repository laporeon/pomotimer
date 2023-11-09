import { focusProgressBar, breakProgressBar } from '../libs/cli-progress.js';

export class Pomodoro {
  constructor(focus, breakTime) {
    this.focus = focus;
    this.breakTime = breakTime;
    this.timer = '';
    this.value = 0;
    this.focusTimeInSeconds = this.focus * 60;
    this.breakTimeInSeconds = this.breakTime * 60;
    this.currentProgressBar = focusProgressBar;
    this.currentTime = this.focusTimeInSeconds;
  }

  startFocus() {
    this.createProgressBar();
    this.countdown();
  }

  // TODO: Fix breakProgressBar issue where duration_formatted skips the last second e.g 2:00 goes only to 1:59
  startBreak() {
    this.currentProgressBar = breakProgressBar;
    this.currentTime = this.breakTimeInSeconds;
    this.value = 0;

    this.createProgressBar();
    this.countdown();
  }

  countdown() {
    this.timer = setInterval(() => {
      if (this.currentTime <= 0) {
        this.stop();
      }

      this.currentTime--;
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
    clearInterval(this.timer);
    this.currentProgressBar.stop();

    if (this.currentProgressBar === focusProgressBar) return this.startBreak();
  }

  createProgressBar() {
    this.currentProgressBar.start(this.currentTime, 0, {
      speed: 'N/A',
      time_formatted: this.format(this.currentTime),
    });
  }

  updateProgressBar() {
    this.value++;
    this.currentProgressBar.update(this.value);
  }

  init() {
    this.startFocus();
  }
}
