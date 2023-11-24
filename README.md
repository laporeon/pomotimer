<h1 align="center">
	<img width="120" src="https://raw.githubusercontent.com/laporeon/pomotimer/main/assets/icon.png" alt="Pomotimer">
  <p> Pomotimer</p>
</h1>

> A simple Pomodoro CLI timer.

## Table of Contents

- [Features](#Features)
- [Installing](#installing)
- [Usage](#usage)
- [Preview](#preview)
  <br/>

---

## Features

- Customize your focus time session.
- Customize your break time session.
- Customize how many cycles you want to do.
- Customize your Pomodoro title.
- Get a system notification at the end of each session. [Not available for WSL and MacOS]
- Customize notification description for finished cycles.
- Customize style for Pomodoro texts.

## Installing

| NPM                                 | Yarn                                 |
| ----------------------------------- | ------------------------------------ |
| <pre>npm install -g pomotimer</pre> | <pre>yarn global add pomotimer</pre> |

## Usage

```text
Usage: pomotimer [options]

A Pomodoro CLI timer.

Options:
  -V, --version              output the version number
  -f, --focus <value>        Focus time in minutes (default: "25")
  -p, --pause <value>        Break time in minutes (default: "5")
  -c, --cycles <value>       How many cycles you want do do (default: "4")
  -t, --title <value>        Customize Pomodoro title. (default: "Pomotimer")
  -d, --description <value>  Customize notification description. (default: "Congratulations! Session completed.")
  -s, --style <value>        Customize CLI text color. (default: "morning")
  -h, --help                 display help for command

Examples:
  pomotimer -t "Studying JavaScript"
  pomotimer -s "summer"
  pomotimer -f 15 -p 5 -c 2
  pomotimer -f 5 -t "Reading" -d "Finished" -s "rainbow"
```

## Preview

![Pomodotimer](https://raw.githubusercontent.com/laporeon/pomotimer/main/assets/screenshot.png)

![Notification](https://raw.githubusercontent.com/laporeon/pomotimer/main/assets/defaultnotification.png)

[⬆ Back to the top](#---pomotimer)
