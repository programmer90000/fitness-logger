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