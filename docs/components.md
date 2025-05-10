# Components

This file contains documentation about each of the components in the repository.

## `app/components/create-exercise/`
The `app/components/create-exercise/` directory is used to create a component for the Create Exercise screen. It uses the `DropdownComponent` and the `UploadVideo` component to create fields.

The component first asks the user for an exercise name using a TextInput box. The component then asks the user for an exercise type using the `DropdownComponent`. The component then asks the user for any exercise notes using a multi-line TextInput box. The component then allows the user to input a video showing how the exercise is performed. At the bottom of this component, there is an Add Exercise button

## `app/components/dropdown-box/`
The `app/components/dropdown-box/` directory is used to create a component for a dropdown box. When this box is clicked on, a dropdown list appears, from which the user can select an option

## `app/components/Footer/`
The `app/components/Footer/` directory creates a footer which can be used in the app

## `app/components/line-grpah`
The `app/components/line-graph` directory creates a line graph

## `app/components/upload-video`
The `app/components/upload-video` directory creates a button which allows the user to upload a video to the app

## `app/components/workout-form`
The `app/components/workout-form` directory is used to create a component for a workout form. This form is used when creating a new exercise.

The form asks the user for a workout name and notes. After this, there is are a number of fields: Exercise Name, Personal Best, Weight Size and Reps.

At the bottom of these fields, there is a button to add another set. Pressing this button creates a new row of the same fields with the same Exercise Name, Personal Best, Weight Size and Reps.

Under this button, there is a button to add another exercise. Pressing this button creates a new row of the same fields which are empty.

Under this button, there is a button to submit the data. This button organises and displays the data on the console.