export class Pomodoro {
  constructor(focus, breakTime) {
    this.focus = focus;
    this.breakTime = breakTime;
    this.focusTimeInSeconds = this.focus * 60;
    this.timer = '';
  }

  startFocus() {
    this.timer = setInterval(() => {
      this.countdown();
    }, 1000);
  }

  countdown() {
    if (this.focusTimeInSeconds <= 0) {
      this.stop();
    }

    const minutes = this.format(Math.floor(this.focusTimeInSeconds / 60));
    const seconds = this.format(Math.floor(this.focusTimeInSeconds % 60));

    this.focusTimeInSeconds--;
    this.display(minutes, seconds);
  }

  format(value) {
    if (value < 10) {
      return `0${value}`;
    }

    return value;
  }

  stop() {
    clearInterval(this.timer);
  }

  display(minutes, seconds) {
    console.log(`${minutes}:${seconds}`);
  }
}
