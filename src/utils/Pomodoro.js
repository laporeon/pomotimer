import { progressBar } from '../libs/cli-progress.js';

export class Pomodoro {
  constructor(focus, breakTime) {
    this.focus = focus;
    this.breakTime = breakTime;
    this.focusTimeInSeconds = this.focus * 60;
    this.timer = '';
    this.value = 0;
    this.progressBar = progressBar;
  }
  startFocus() {
    this.createProgressBar();

    this.timer = setInterval(() => {
      this.countdown();
      this.updateProgressBar();
    }, 1000);
  }

  startBreak() {
    console.log("\nIt's break time!!");
  }

  countdown() {
    if (this.focusTimeInSeconds <= 0) {
      this.stop();
    }

    this.focusTimeInSeconds--;
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
    this.progressBar.stop();
    this.startBreak();
  }

  createProgressBar() {
    this.progressBar.start(this.focusTimeInSeconds, 0, {
      speed: 'N/A',
      focus_time_formatted: this.format(this.focusTimeInSeconds),
    });
  }

  updateProgressBar() {
    this.value++;
    this.progressBar.update(this.value);
  }

  init() {
    this.startFocus();
  }
}
