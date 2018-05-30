This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

Below you'll find information about performing common tasks. The most recent version of this guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

## Table of Contents
* [Overview](#overview)
* [Demo](#demo)
* [Technology](#technology)
* [Available Scripts](#available-scripts)
  * [npm start](#npm-start)
  * [npm test](#npm-test)
  * [npm run ios](#npm-run-ios)
  * [npm run android](#npm-run-android)
  * [npm run eject](#npm-run-eject)


## Overview
In general, PicFood is an application that aims at improving the current food review system.
It has four main functions.
* Photo sharing: user can post photos a dish, which can be viewed by the user’s followers and users who view the dish in the restaurant page.
* review system: user can post write reviews of a dish, which can be viewed by the user’s followers and users who view the dish in the restaurant page.
* Search function: users can search a dish or a restaurant by keyword and the returned results is based on the user location and will be sorted according to the user-defined criteria.
* Social network: a user can follow other users to view their recent food sharing activities.

## Demo
### Screenshots
[![alt text](https://github.com/yangkai2g7k/PicFood-Frontend/tree/master/assets/login.jpg)]
![alt text](https://github.com/yangkai2g7k/PicFood-Frontend/tree/master/assets/timeline.jpg)
![alt text](https://github.com/yangkai2g7k/PicFood-Frontend/tree/master/assets/search.jpg)
![alt text](https://github.com/yangkai2g7k/PicFood-Frontend/tree/master/assets/restaurant.jpg)

### Demo Video

[![IMAGE ALT TEXT HERE](https://i.ytimg.com/vi_webp/nSnPSLVaOSE/sddefault.webp)](https://youtu.be/nSnPSLVaOSE)

## Technology
### Frontend:
* React Native
* Native Base
* Expo
* React Redux
* React Navigation
Backend:
* Spring Boot framework
* JSON Web Tokens
* Swagger
* Amazon AWS and S3
* Postman
* MySQL Workbench / DataGrip


## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

##### Using Genymotion's `adb`

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.

#### `npm run eject`

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.

**Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.
