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
- Customize your Pomodoro title.
- Get a system notification at session completed. [Not available for WSL and MacOS]
- Customize your notification description.
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
  -t, --title <value>        Customize Pomodoro title. (default: "Pomotimer")
  -d, --description <value>  Customize notification description. (default: "Congratulations! Session completed.")
  -s, --style <value>        Customize CLI text color. (default: "morning")
  -h, --help                 display help for command

Examples:
  pomotimer -t "Studying JavaScript"
  pomotimer -s "summer"
  pomotimer -f 5 -t "Reading" -d "Finished" -s "rainbow"
```

## Preview

![Pomodotimer](https://raw.githubusercontent.com/laporeon/pomotimer/main/assets/screenshot.png)

![Notification](https://raw.githubusercontent.com/laporeon/pomotimer/main/assets/defaultnotification.png)

[⬆ Back to the top](#---pomotimer)
