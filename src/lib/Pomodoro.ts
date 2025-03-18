import { cristal } from 'gradient-string';
import ora, { Ora } from 'ora';

import { localTime } from '@helpers/localtime';
import { notificationAlert } from '@helpers/notifier';
import IPomodoro from '@interfaces/IPomodoro';

export class Pomodoro {
  private title: string;
  private focus: number;
  private breakTime: number;
  private cycles: number;
  private timer: NodeJS.Timeout = setTimeout(() => {}, 0);
  private elapsedTime: number = 0;
  private focusTimeInSeconds: number;
  private breakTimeInSeconds: number;
  private currentTime: number;
  private percentage: number = 0;
  private type: 'Focus' | 'Break' = 'Focus';
  private spinner: Ora = ora();
  private index: number = 1;

  constructor({ title, focus, pause, cycles }: IPomodoro) {
    this.title = title;
    this.focus = focus;
    this.breakTime = pause;
    this.cycles = cycles;
    this.focusTimeInSeconds = this.focus * 60;
    this.breakTimeInSeconds = this.breakTime * 60;
    this.currentTime = this.focusTimeInSeconds;
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

  format(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  }

  notify() {
    if (this.type === 'Focus') {
      notificationAlert({
        title: this.title,
        description: 'Time to take a break!',
        status: 'focus',
      });

      this.type = 'Break';
      this.currentTime = this.breakTimeInSeconds;
      this.elapsedTime = 0;
      this.percentage = 0;
      this.spinner.succeed();

      return this.start();
    }

    if (this.type === 'Break' && this.index < this.cycles) {
      notificationAlert({
        title: this.title,
        description: 'Break is over. Time to focus!',
        status: 'break',
      });

      this.index++;
      this.type = 'Focus';
      this.currentTime = this.focusTimeInSeconds;
      this.elapsedTime = 0;
      this.percentage = 0;
      this.spinner.succeed();

      return this.start();
    }

    this.spinner.succeed();
    console.log(cristal('\nFinished!'));
    return notificationAlert({
      title: this.title,
      description: 'Congratulations, Pomodoro finished!',
    });
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
