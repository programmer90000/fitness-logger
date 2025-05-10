# Android Command Line Tools Installation And Usage

## Android Command Line Tools Installation

Go to the [Android Studio Website](https://developer.android.com/studio)

Scroll down to the Command line tools only section

Download the correct installation file for your operating system

Extract the `cmdline-tools` directory into a new directory named `android`

Inside the `cmdline-tools` directory, create a new directory titled `latest`. Move everything else in the `cmdline-tools` directory into the latest directory

Navigate to the `cmdline-tools/latest/bin` directory in the command line

Run the command `sdkmanager "platform-tools" "build-tools;30.0.3"` (Replace `30.0.3` with the newest version of `build-tools`)

Accept the terms and conditions by typing `y`

Add the path to the `platform-tools` directory to the computer system variables

Add the path to the `cmdline-tools/tools` directory to the computer system variables

Add the path to the `emulator` directory to the computer system variables

## Create a new Virtual Device in Android Command Line Tools

Run the following command in the command line: `avdmanager create avd -n AVD_NAME -k "system-images;android-25;google_apis;x86"`

Replace the `system-images;android-25;google_apis;x86` variable with the Android version you want to install

When the option to create a custom hardware profile shows up, type `no`

## Run the Fitness Logger app in Android Command Line Tools

Run the command `emulator –avd AVD_NAME`

Navigate to the directory containing the app using the command line

Type `nvm use (VERSION COMPATIABLE WITH THIS APP)`

Type `npm install`

Type `npm run android`

Paste the link that appears in the Expo Go app on the Android Emulator