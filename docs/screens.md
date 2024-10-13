# Components

This file contains documentation about each of the screens in the repository.

## `app/screens/badges/`
This screen contains all of the badges avaliable. Some badges are displayed as gold and some badges are displayed as black

## `app/screens/create-a-new-workout-preset/`
This screens uses the `WorkoutForm` component in `app/components/workout-form` to display a form to create a new workout preset

## `app/screens/create-exercise/`
The `app/screens/create-exercise/` directory is used to create the Create Exercise screen. It uses the `DropdownComponent` and the `UploadVideo` component to create fields.

The component first asks the user for an exercise name using a TextInput box. The component then asks the user for an exercise type using the `DropdownComponent`. The component then asks the user for any exercise notes using a multi-line TextInput box. The component then allows the user to input a video showing how the exercise is performed. At the bottom of this component, there is an Add Exercise button

## `app/screens/create-workout/`
The `app/screens/create-workout/` directory is used to create a screen to create a new workout. This screen contains a button to begin a new workout. It also contains all of the workout presets created by the user

## `app/screens/log-workout/`
This screens uses the `WorkoutForm` component in `app/components/workout-form` to display a form to create a new workout

## `app/screens/set-goal`
The `app/screen/set-goal` directory is used to create a new goal. The user is asked to enter a goal name, goal description, start date and end date. The user also has the option to enter the date for a notification which reminds the user of this goal

## `app/screens/settings`
The `app/screen/settings` directory is used to create a screen containing all of the app settings which the user can modify

## `app/screens/statistics`
The `app/screen/statistics` directory is used to create a screen containing statistics. These statistics are taken from the data input by the user into the Workout Form

## `app/screens/upload-download-data`
The `app/screen/upload-download-data` directory is used to create a screen containing 2 buttons. 1 button allows the user to upload data to the app. The other button allows the user to download data from the app

## `app/screens/view-goals`
The `app/screen/view-goals` directory creates a screen which allows the user to view all of the goals he has set.

## `app/screens/workout-history`
The `app/screen/workout-history` directory creates a screen which allows the user to view all of the completed workouts