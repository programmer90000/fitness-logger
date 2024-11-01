const Realm = require("realm");
import { workoutPresets } from "../database/tables/workoutPresets.js";
import { exercises } from "../database/tables/exercises.js";
import { previousWorkouts } from "../database/tables/previousWorkouts.js";
import { badges } from "../database/tables/badges.js";
import { goals } from "../database/tables/goals.js";
import { workoutPresetsExercises } from "../database/realm-database.js";

// ! workoutPresets table
describe("workoutPresets table", () => {
    let realm;

    beforeEach(() => {
        realm = new Realm({ "schema": [workoutPresets] });
    });

    afterEach(async() => {
        realm.write(() => {
            realm.deleteAll(); // Clear all data in the database
        });
        await realm.close(); // Ensure Realm is closed after each test
    });
    
    test("Create workoutPresets table", () => {
        expect(realm.schema[0].name).toBe("WorkoutPresets");
    });

    test("Create record in workoutPresets table", () => {
        realm.write(() => {
            realm.create("WorkoutPresets", { "id": 1, "name": "Gym", "notes": "Main Workout" });
        });
        const workoutPreset = realm.objects("WorkoutPresets")[0];
        expect(workoutPreset.id).toBe(1);
        expect(workoutPreset.name).toBe("Gym");
        expect(workoutPreset.notes).toBe("Main Workout");
    });

    test("Read record in workoutPresets table", () => {
        realm.write(() => {
            realm.create("WorkoutPresets", { "id": 1, "name": "Gym", "notes": "Main Workout" });
        });
        const workoutPreset = realm.objects("WorkoutPresets")[0];
        expect(workoutPreset.id).toBe(1);
        expect(workoutPreset.name).toBe("Gym");
        expect(workoutPreset.notes).toBe("Main Workout");
    });

    test("Update record in workoutPresets table", () => {
        realm.write(() => {
            realm.create("WorkoutPresets", { "id": 1, "name": "Gym", "notes": "Main Workout" });
        });
        realm.write(() => {
            const workoutPreset = realm.objects("WorkoutPresets")[0];
            workoutPreset.notes = "Using Dumbbells";
        });
        const updatedExercise = realm.objects("WorkoutPresets")[0];
        expect(updatedExercise.notes).toBe("Using Dumbbells");
    });

    test("Delete record in workoutPresets table", () => {
        realm.write(() => {
            realm.create("WorkoutPresets", { "id": 1, "name": "Gym", "notes": "Main Workout" });
        });
        realm.write(() => {
            const workoutPreset = realm.objects("WorkoutPresets")[0];
            realm.delete(workoutPreset);
        });
        const remainingWorkoutPresets = realm.objects("WorkoutPresets");
        expect(remainingWorkoutPresets.length).toBe(0);
    });
});

// ! exercises table
describe("exercises table", () => {
    let realm;

    beforeEach(() => {
        realm = new Realm({ "schema": [exercises] });
    });

    afterEach(async() => {
        realm.write(() => {
            realm.deleteAll(); // Clear all data in the database
        });
        await realm.close(); // Ensure Realm is closed after each test
    });
    
    test("Create exercises table", () => {
        expect(realm.schema[0].name).toBe("Exercises");
    });

    test("Create record in exercises table", () => {
        realm.write(() => {
            realm.create("Exercises", { "id": 1, "name": "Plank", "type": "Bodyweight", "notes": "Do not arch back. Keep neck in line with body", "video": "Video-Path" });
        });
        const exercises = realm.objects("Exercises")[0];
        expect(exercises.id).toBe(1);
        expect(exercises.name).toBe("Plank");
        expect(exercises.type).toBe("Bodyweight");
        expect(exercises.notes).toBe("Do not arch back. Keep neck in line with body");
        expect(exercises.video).toBe("Video-Path");
    });

    test("Read record in exercises table", () => {
        realm.write(() => {
            realm.create("Exercises", { "id": 1, "name": "Plank", "type": "Bodyweight", "notes": "Do not arch back. Keep neck in line with body", "video": "Video-Path" });
        });
        const exercises = realm.objects("Exercises")[0];
        expect(exercises.id).toBe(1);
        expect(exercises.name).toBe("Plank");
        expect(exercises.type).toBe("Bodyweight");
        expect(exercises.notes).toBe("Do not arch back. Keep neck in line with body");
        expect(exercises.video).toBe("Video-Path");
    });

    test("Update record in exercises table", () => {
        realm.write(() => {
            realm.create("Exercises", { "id": 1, "name": "Plank", "type": "Bodyweight", "notes": "Do not arch back. Keep neck in line with body", "video": "Video-Path" });
        });
        realm.write(() => {
            const exercises = realm.objects("Exercises")[0];
            exercises.notes = "Do not arch back. Keep neck in line with body. Do not drop hips";
        });
        const updatedExercise = realm.objects("Exercises")[0];
        expect(updatedExercise.notes).toBe("Do not arch back. Keep neck in line with body. Do not drop hips");
    });

    test("Delete record in exercises table", () => {
        realm.write(() => {
            realm.create("Exercises", { "id": 1, "name": "Plank", "type": "Bodyweight", "notes": "Do not arch back. Keep neck in line with body", "video": "Video-Path" });
        });
        realm.write(() => {
            const exercises = realm.objects("Exercises")[0];
            realm.delete(exercises);
        });
        const remainingExercises = realm.objects("Exercises");
        expect(remainingExercises.length).toBe(0);
    });
});

// ! workoutPresetsExercises table
describe("workoutPresetsExercises table", () => {
    let realm;

    beforeEach(() => {
        realm = new Realm({ "schema": [workoutPresets, exercises, workoutPresetsExercises] });
    });

    afterEach(async () => {
        realm.write(() => {
            realm.deleteAll(); // Clear all data in the database
        });
        await realm.close(); // Ensure Realm is closed after each test
    });

    test("Create workoutPresetsExercises table", () => {
        expect(realm.schema[2].name).toBe("WorkoutPresetsExercises");
    });

    test("Create record in workoutPresetsExercises table", () => {
        realm.write(() => {
            // Create WorkoutPreset and Exercise first
            const preset = realm.create("WorkoutPresets", { "id": 1, "name": "Gym", "notes": "Main Workout" });
            const exercise = realm.create("Exercises", { "id": 1, "name": "Plank", "type": "Bodyweight", "notes": "Core exercise", "video": "Video-Path" });

            // Create a linking record
            realm.create("WorkoutPresetsExercises", { "id": 1, "workoutPreset": preset, "exercise": exercise });
        });

        const links = realm.objects("WorkoutPresetsExercises");
        expect(links.length).toBe(1);

        // Access the linking record's properties
        const workoutPresetLink = links[0];
        expect(workoutPresetLink.workoutPreset).not.toBeUndefined();
        expect(workoutPresetLink.exercise).not.toBeUndefined();
        expect(workoutPresetLink.workoutPreset.name).toBe("Gym");
        expect(workoutPresetLink.exercise.name).toBe("Plank");
    });

    test("Read record in workoutPresetsExercises table", () => {
        realm.write(() => {
            const preset = realm.create("WorkoutPresets", { "id": 1, "name": "Gym", "notes": "Main Workout" });
            const exercise = realm.create("Exercises", { "id": 1, "name": "Plank", "type": "Bodyweight", "notes": "Core exercise", "video": "Video-Path" });
            realm.create("WorkoutPresetsExercises", { "id": 1, "workoutPreset": preset, "exercise": exercise });
        });

        const links = realm.objects("WorkoutPresetsExercises");
        expect(links.length).toBe(1);
        expect(links[0].workoutPreset.name).toBe("Gym");
        expect(links[0].exercise.name).toBe("Plank");
    });

    test("Update record in workoutPresetsExercises table", () => {
        realm.write(() => {
            const preset = realm.create("WorkoutPresets", { "id": 1, "name": "Gym", "notes": "Main Workout" });
            const exercise = realm.create("Exercises", { "id": 1, "name": "Plank", "type": "Bodyweight", "notes": "Core exercise", "video": "Video-Path" });
            const link = realm.create("WorkoutPresetsExercises", { "id": 1, "workoutPreset": preset, "exercise": exercise });
            
            // Update the exercise in the linking record
            const newExercise = realm.create("Exercises", { "id": 2, "name": "Squat", "type": "Strength", "notes": "Leg exercise", "video": "Video-Path" });
            link.exercise = newExercise;
        });

        const links = realm.objects("WorkoutPresetsExercises");
        expect(links.length).toBe(1);
        expect(links[0].exercise.name).toBe("Squat");
    });

    test("Delete record in workoutPresetsExercises table", () => {
        realm.write(() => {
            const preset = realm.create("WorkoutPresets", { "id": 1, "name": "Gym", "notes": "Main Workout" });
            const exercise = realm.create("Exercises", { "id": 1, "name": "Plank", "type": "Bodyweight", "notes": "Core exercise", "video": "Video-Path" });
            const link = realm.create("WorkoutPresetsExercises", { "id": 1, "workoutPreset": preset, "exercise": exercise });

            // Delete the linking record
            realm.delete(link);
        });

        const links = realm.objects("WorkoutPresetsExercises");
        expect(links.length).toBe(0);
    });
});

// ! previousWorkouts table
describe("previousWorkouts table", () => {
    let realm;

    beforeEach(() => {
        realm = new Realm({ "schema": [previousWorkouts] });
    });

    afterEach(async() => {
        realm.write(() => {
            realm.deleteAll(); // Clear all data in the database
        });
        await realm.close(); // Ensure Realm is closed after each test
    });
    
    test("Create PreviousWorkouts table", () => {
        expect(realm.schema[0].name).toBe("PreviousWorkouts");
    });

    test("Create record in previousWorkouts table", () => {
        const newDate = new Date(2024, 10, 30);

        realm.write(() => {
            realm.create("PreviousWorkouts", { "id": 1, "name": "Gym", "notes": "Main Workout", "date": newDate });
        });
        const previousWorkout = realm.objects("PreviousWorkouts")[0];
        expect(previousWorkout.id).toBe(1);
        expect(previousWorkout.name).toBe("Gym");
        expect(previousWorkout.notes).toBe("Main Workout");
        expect(previousWorkout.date).toEqual(new Date("2024-11-30T00:00:00.000Z"));
    });
    test("Read record in previousWorkouts table", () => {
        const newDate = new Date(2024, 10, 30);

        realm.write(() => {
            realm.create("PreviousWorkouts", { "id": 1, "name": "Gym", "notes": "Main Workout", "date": newDate });
        });
        const previousWorkout = realm.objects("PreviousWorkouts")[0];
        expect(previousWorkout.id).toBe(1);
        expect(previousWorkout.name).toBe("Gym");
        expect(previousWorkout.notes).toBe("Main Workout");
        expect(previousWorkout.date).toEqual(new Date("2024-11-30T00:00:00.000Z"));
    });

    test("Update record in previousWorkouts table", () => {
        const newDate = new Date(2024, 10, 30);

        realm.write(() => {
            realm.create("PreviousWorkouts", { "id": 1, "name": "Gym", "notes": "Main Workout", "date": newDate });
        });
        realm.write(() => {
            const previousWorkout = realm.objects("PreviousWorkouts")[0];
            previousWorkout.notes = "Secondary Workout";
        });
        const updatedPreviousWorkout = realm.objects("PreviousWorkouts")[0];
        expect(updatedPreviousWorkout.notes).toBe("Secondary Workout");
    });

    test("Delete record in previousWorkouts table", () => {
        const newDate = new Date(2024, 10, 30);

        realm.write(() => {
            realm.create("PreviousWorkouts", { "id": 1, "name": "Gym", "notes": "Main Workout", "date": newDate });
        });
        realm.write(() => {
            const previousWorkout = realm.objects("PreviousWorkouts")[0];
            realm.delete(previousWorkout);
        });
        const remainingPreviousWorkouts = realm.objects("PreviousWorkouts");
        expect(remainingPreviousWorkouts.length).toBe(0);
    });
});

// ! previousWorkoutsExercises table
describe("previousWorkoutsExercises table", () => {

    test("Create previousWorkoutsExercises table", () => { });

    test("Create record in previousWorkoutsExercises table", () => { });

    test("Read record in previousWorkoutsExercises table", () => { });

    test("Update record in previousWorkoutsExercises table", () => { });

    test("Delete record in previousWorkoutsExercises table", () => { });
});

// ! badges table
describe("badges table", () => {
    let realm;

    beforeEach(() => {
        realm = new Realm({ "schema": [badges] });
    });

    afterEach(async() => {
        realm.write(() => {
            realm.deleteAll(); // Clear all data in the database
        });
        await realm.close(); // Ensure Realm is closed after each test
    });
    
    test("Create Badges table", () => {
        expect(realm.schema[0].name).toBe("Badges");
    });

    test("Create record in Badges table", () => {
        realm.write(() => {
            realm.create("Badges", { "id": 1, "image": "image1.png", "text": "This is Badge 1", "completed": true });
        });
        const badges = realm.objects("Badges")[0];
        expect(badges.id).toBe(1);
        expect(badges.image).toBe("image1.png");
        expect(badges.text).toBe("This is Badge 1");
        expect(badges.completed).toEqual(true);
    });
    test("Read record in Badges table", () => {
        realm.write(() => {
            realm.create("Badges", { "id": 1, "image": "image1.png", "text": "This is Badge 1", "completed": true });
        });
        const badges = realm.objects("Badges")[0];
        expect(badges.id).toBe(1);
        expect(badges.image).toBe("image1.png");
        expect(badges.text).toBe("This is Badge 1");
        expect(badges.completed).toEqual(true);
    });

    test("Update record in Badges table", () => {
        realm.write(() => {
            realm.create("Badges", { "id": 1, "image": "image1.png", "text": "This is Badge 1", "completed": true });
        });

        realm.write(() => {
            const badges = realm.objects("Badges")[0];
            badges.text = "This is Badge 2";
        });
        const updatedBadges = realm.objects("Badges")[0];
        expect(updatedBadges.text).toBe("This is Badge 2");
    });

    test("Delete record in Badges table", () => {
        realm.write(() => {
            realm.create("Badges", { "id": 1, "image": "image1.png", "text": "This is Badge 1", "completed": true });
        });
        realm.write(() => {
            const badges = realm.objects("Badges")[0];
            realm.delete(badges);
        });
        const remainingBadges = realm.objects("Badges");
        expect(remainingBadges.length).toBe(0);
    });
});

// ! goals table
describe("goals table", () => {
    let realm;

    beforeEach(() => {
        realm = new Realm({ "schema": [goals] });
    });

    afterEach(async() => {
        realm.write(() => {
            realm.deleteAll(); // Clear all data in the database
        });
        await realm.close(); // Ensure Realm is closed after each test
    });
    
    test("Create Goals table", () => {
        expect(realm.schema[0].name).toBe("Goals");
    });

    test("Create record in Goals table", () => {
        const newDate = new Date(2024, 10, 30);

        realm.write(() => {
            realm.create("Goals", { "id": 1, "name": "Goal 1", "startDate": newDate, "endDate": newDate, "reminders": newDate, "notes": "Goal Notes" });
        });
        const goals = realm.objects("Goals")[0];
        expect(goals.id).toBe(1);
        expect(goals.name).toBe("Goal 1");
        expect(goals.startDate).toEqual(new Date("2024-11-30T00:00:00.000Z"));
        expect(goals.endDate).toEqual(new Date("2024-11-30T00:00:00.000Z"));
        expect(goals.reminders).toEqual(new Date("2024-11-30T00:00:00.000Z"));
        expect(goals.notes).toBe("Goal Notes");
    });
    test("Read record in Goals table", () => {
        const newDate = new Date(2024, 10, 30);

        realm.write(() => {
            realm.create("Goals", { "id": 1, "name": "Goal 1", "startDate": newDate, "endDate": newDate, "reminders": newDate, "notes": "Goal Notes" });
        });
        const goals = realm.objects("Goals")[0];
        expect(goals.id).toBe(1);
        expect(goals.name).toBe("Goal 1");
        expect(goals.startDate).toEqual(new Date("2024-11-30T00:00:00.000Z"));
        expect(goals.endDate).toEqual(new Date("2024-11-30T00:00:00.000Z"));
        expect(goals.reminders).toEqual(new Date("2024-11-30T00:00:00.000Z"));
        expect(goals.notes).toBe("Goal Notes");
    });

    test("Update record in Goals table", () => {
        const newDate = new Date(2024, 10, 30);

        realm.write(() => {
            realm.create("Goals", { "id": 1, "name": "Goal 1", "startDate": newDate, "endDate": newDate, "reminders": newDate, "notes": "Goal Notes" });
        });

        realm.write(() => {
            const goals = realm.objects("Goals")[0];
            goals.name = "Goal 2";
        });
        const updatedGoals = realm.objects("Goals")[0];
        expect(updatedGoals.name).toBe("Goal 2");
    });

    test("Delete record in Goals table", () => {
        const newDate = new Date(2024, 10, 30);

        realm.write(() => {
            realm.create("Goals", { "id": 1, "name": "Goal 1", "startDate": newDate, "endDate": newDate, "reminders": newDate, "notes": "Goal Notes" });
        });
        
        realm.write(() => {
            const goals = realm.objects("Goals")[0];
            realm.delete(goals);
        });
        const remainingGoals = realm.objects("Goals");
        expect(remainingGoals.length).toBe(0);
    });
});
