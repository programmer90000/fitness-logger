import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity, Platform, Alert } from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { exercises, workoutPresets, workoutPresetsExercises, previousWorkouts, previousWorkoutsExercises } from "../../../database/realm-database.js";
import Realm from "realm";
import DropdownComponent from "../../components/dropdown-box/dropdown-box";
import { useTheme } from "../../hooks/useTheme.js";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const WorkoutForm = ({ saveTo, defaultValues }) => {
    const router = useRouter();
    const [removedButtons, setRemovedButtons] = useState([]);
    const [workoutName, setWorkoutName] = useState(null);
    const [workoutDate, setWorkoutDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [realmInstance, setRealmInstance] = useState(null);
    const [dropdownDisabled, setDropdownDisabled] = useState([]);
    const { control, handleSubmit, getValues, setValue, reset, watch } = useForm({ defaultValues });
    const { fields, append, insert, remove } = useFieldArray({
        control,
        "name": "exercises",
        "keyName": "id",
    });
    
    const allExercises = realmInstance ? realmInstance.objects("Exercises") : [];
    const names = allExercises.map((exercise) => { return exercise.name; });
    const names2 = names.map((name) => {
        return {
            "label": name,
            "value": name,
        };
    });
    const { isReady, colours } = useTheme();
    const { id, source } = useLocalSearchParams();
    
    const saveFormData = async (data) => {
        try {
            await AsyncStorage.setItem("workoutFormData", JSON.stringify(data));
        } catch (error) {
            console.error("Error saving form data to AsyncStorage:", error);
        }
    };

    const loadFormData = async () => {
        try {
            const savedData = await AsyncStorage.getItem("workoutFormData");
            return savedData ? JSON.parse(savedData) : null;
        } catch (error) {
            console.error("Error loading form data from AsyncStorage:", error);
            return null;
        }
    };

    const trimWorkoutData = (data) => {
        return {
            ...data,
            "workoutName": data.workoutName?.trim(),
            "workoutNotes": data.workoutNotes?.trim(),
            "exercises": data.exercises?.map((exercise) => { return {
                ...exercise,
                "name": exercise.name?.trim(),
                "duration": exercise.duration?.trim(),
                "reps": exercise.reps?.trim(),
            }; }),
        };
    };

    const checkForDuplicateWorkoutPresetName = (name) => {
        const existingWorkouts = realmInstance.objects("WorkoutPresets").filtered("name == $0", name);
        return existingWorkouts.length > 0;
    };

    useEffect(() => {
        let realm;
        
        const loadSavedData = async () => {
            if (!isReady) {
                return;
            }

            realm = new Realm({ "schema": [workoutPresets, exercises, workoutPresetsExercises, previousWorkouts, previousWorkoutsExercises] });
            setRealmInstance(realm);

            if (id) {
                if (source === "workout-history") {
                    const workout = realm.objectForPrimaryKey("PreviousWorkouts", parseInt(id));
                    const exerciseRecords = realm.objects("PreviousWorkoutsExercises").filtered("previousWorkouts.id == $0", parseInt(id));
                
                    const exercisesData = exerciseRecords.map((exercise) => { return {
                        "name": exercise.exercises.name,
                        "duration": exercise.metrics,
                        "reps": exercise.volume,
                        "personalBest": "N/A",
                    }; });
                
                    reset({
                        "workoutName": workout.name,
                        "workoutNotes": workout.notes,
                        "exercises": exercisesData,
                    });
                
                } else if (source === "workout-presets") {
                    const workoutPreset = realm.objectForPrimaryKey("WorkoutPresets", parseInt(id));
                    const exerciseRecords = realm.objects("WorkoutPresetsExercises").filtered("workoutPresets.id == $0", parseInt(id));
            
                    const exercisesData = exerciseRecords.map((exercise) => { return {
                        "name": exercise.exercises.name,
                        "duration": exercise.metrics,
                        "reps": exercise.volume,
                        "personalBest": "N/A",
                    }; });
            
                    reset({
                        "workoutName": workoutPreset.name,
                        "workoutNotes": workoutPreset.notes,
                        "exercises": exercisesData,
                    });
                }
            } else {
                const savedData = await loadFormData();
                if (savedData) {
                    reset(savedData);
                    if (savedData.workoutDate) {
                        setWorkoutDate(new Date(savedData.workoutDate));
                    }
                }
            }
        };

        loadSavedData();

        return () => {
            if (realm) {
                realm.close();
            }
        };
    }, [isReady, reset, id]);

    const onSubmit = async (data) => {
        try {
            const trimmedData = trimWorkoutData(data);

            if (id) {
                realmInstance.write(() => {
                    if (source === "workout-history") {
                        const existingWorkout = realmInstance.objectForPrimaryKey("PreviousWorkouts", parseInt(id));
                        existingWorkout.name = trimmedData.workoutName;
                        existingWorkout.notes = trimmedData.workoutNotes || "";
                        existingWorkout.date = workoutDate;

                        const existingExercises = realmInstance.objects("PreviousWorkoutsExercises").filtered("previousWorkouts.id == $0", parseInt(id));
                        realmInstance.delete(existingExercises);

                        trimmedData.exercises.forEach((exercise) => {
                            if (!exercise.name || isNaN(exercise.duration) || isNaN(exercise.reps)) { return; }

                            const exerciseObj = realmInstance.objects("Exercises").filtered("name == $0", exercise.name)[0];
                            if (!exerciseObj) { return; }

                            const currentExerciseId = realmInstance.objects("PreviousWorkoutsExercises").max("id") || 0;
                            const newExerciseId = currentExerciseId + 1;

                            realmInstance.create("PreviousWorkoutsExercises", {
                                "id": newExerciseId,
                                "previousWorkouts": existingWorkout,
                                "exercises": exerciseObj,
                                "metrics": exercise.duration,
                                "volume": exercise.reps.toString(),
                            });
                        });
                    } else if (source === "workout-presets") {
                        const existingPreset = realmInstance.objectForPrimaryKey("WorkoutPresets", parseInt(id));
                        existingPreset.name = trimmedData.workoutName;
                        existingPreset.notes = trimmedData.workoutNotes || "";

                        const existingExercises = realmInstance.objects("WorkoutPresetsExercises")
                            .filtered("workoutPresets.id == $0", parseInt(id));
                        realmInstance.delete(existingExercises);

                        trimmedData.exercises.forEach((exercise) => {
                            if (!exercise.name || isNaN(exercise.duration) || isNaN(exercise.reps)) { return; }

                            const exerciseObj = realmInstance.objects("Exercises").filtered("name == $0", exercise.name)[0];
                            if (!exerciseObj) { return; }

                            const currentExerciseId = realmInstance.objects("WorkoutPresetsExercises").max("id") || 0;
                            const newExerciseId = currentExerciseId + 1;

                            realmInstance.create("WorkoutPresetsExercises", {
                                "id": newExerciseId,
                                "workoutPresets": existingPreset,
                                "exercises": exerciseObj,
                                "metrics": exercise.duration,
                                "volume": exercise.reps.toString(),
                            });
                        });
                    }
                });
            } else {
                if (saveTo === "workoutPresets" && checkForDuplicateWorkoutPresetName(trimmedData.workoutName)) {
                    console.log("Workout Preset name already exists");
                    return;
                }

                realmInstance.write(() => {
                    let newId, newWorkout;

                    if (saveTo === "workoutPresets") {
                        const currentWorkoutId = realmInstance.objects("WorkoutPresets").max("id") || 0;
                        newId = currentWorkoutId === 0 ? 1 : currentWorkoutId + 1;

                        newWorkout = realmInstance.create("WorkoutPresets", {
                            "id": newId,
                            "name": trimmedData.workoutName,
                            "notes": trimmedData.workoutNotes || "",
                        });
                    } else if (saveTo === "previousWorkouts") {
                        const currentPreviousWorkoutId = realmInstance.objects("PreviousWorkouts").max("id") || 0;
                        newId = currentPreviousWorkoutId === 0 ? 1 : currentPreviousWorkoutId + 1;
                        newWorkout = realmInstance.create("PreviousWorkouts", {
                            "id": newId,
                            "name": trimmedData.workoutName,
                            "notes": trimmedData.workoutNotes || "",
                            "date": workoutDate,
                        });
                    }

                    trimmedData.exercises.forEach((exercise, index) => {
                        if (!exercise.name || isNaN(exercise.duration) || isNaN(exercise.reps)) {
                            console.warn(`Skipping invalid exercise at index ${index}:`, exercise);
                            return;
                        }
                        const currentWorkoutExercisesId = realmInstance.objects("WorkoutPresetsExercises").max("id") || 0;
                        const newWorkoutExercisesId = currentWorkoutExercisesId === 0 ? 1 : currentWorkoutExercisesId + 1;

                        const exerciseObj = realmInstance.objects("Exercises").filtered("name == $0", exercise.name)[0];
                        if (!exerciseObj) {
                            throw new Error(`Exercise with name "${exercise.name}" not found.`);
                        }

                        if (saveTo === "workoutPresets") {
                            realmInstance.create("WorkoutPresetsExercises", {
                                "id": newWorkoutExercisesId,
                                "workoutPresets": newWorkout,
                                "exercises": exerciseObj,
                                "metrics": exercise.duration,
                                "volume": exercise.reps.toString(),
                            });
                        } else if (saveTo === "previousWorkouts") {
                            const currentPreviousWorkoutExercisesId = realmInstance.objects("PreviousWorkoutsExercises").max("id") || 0;
                            const newPreviousWorkoutExercisesId = currentPreviousWorkoutExercisesId === 0 ? 1 : currentPreviousWorkoutExercisesId + 1;

                            realmInstance.create("PreviousWorkoutsExercises", {
                                "id": newPreviousWorkoutExercisesId,
                                "previousWorkouts": newWorkout,
                                "exercises": exerciseObj,
                                "metrics": exercise.duration,
                                "volume": exercise.reps.toString(),
                            });
                        }
                    });
                });
            }
        } catch (error) {
            console.error("Error saving workout:", error);
        } finally {
            await AsyncStorage.removeItem("workoutFormData");

            reset({
                "workoutName": "",
                "workoutNotes": "",
                "exercises": [],
            }); }
    };

    const updateData = async () => {
        const allData = getValues();
        await saveFormData({
            ...allData,
            "workoutDate": workoutDate.toISOString(),
        });
    };
    
    useEffect(() => {
        const subscription = watch((value) => {
            updateData();
        });
        return () => { return subscription.unsubscribe(); };
    }, [watch]);

    const addSet = (index) => {
        const currentValues = getValues(`exercises.${index}`);
        insert(index + 1, {
            "name": currentValues.name,
            "personalBest": currentValues.personalBest || "N/A",
            "duration": currentValues.duration,
            "reps": currentValues.reps,
        });

        setDropdownDisabled((prev) => {
            const newDisabled = [...prev];
            newDisabled.splice(index + 1, 0, true);
            return newDisabled;
        });

        setRemovedButtons([...removedButtons, index]);
    };
    
    const getAllWorkedMuscles = () => {
        const allExercises = fields.map((f) => { return f.name; });
        const uniqueExercises = [...new Set(allExercises)];
    
        const workedMuscles = new Set();
        const allMuscles = new Set(["Pectorals", "Upper back", "Lower back", "Deltoids", "Biceps", "Triceps", "Quadriceps", "Hamstrings", "Glutes", "Calves", "Abs", "Obliques", "Cardio"]);
    
        uniqueExercises.forEach((exerciseName) => {
            const exercise = realmInstance.objects("Exercises").filtered("name == $0", exerciseName)[0];
            if (exercise) {
                exercise.primaryMuscles.forEach((muscle) => { return workedMuscles.add(muscle); });
                exercise.secondaryMuscles.forEach((muscle) => { return workedMuscles.add(muscle); });
            }
        });
    
        const unworkedMuscles = [...allMuscles].filter((muscle) => { return !workedMuscles.has(muscle); });
    
        return {
            "worked": [...workedMuscles],
            "unworked": unworkedMuscles,
        };
    };

    const confirmReset = () => {
        Alert.alert(
            "Reset Form",
            "Are you sure you want to reset the form? All data will be lost.",
            [
                { "text": "Cancel", "style": "cancel" },
                { 
                    "text": "Reset", 
                    "style": "destructive", 
                    "onPress": () => {
                        reset({ "workoutName": "", "workoutNotes": "", "exercises": [] });
                        setWorkoutDate(new Date());
                        setDropdownDisabled([]);
                        AsyncStorage.removeItem("workoutFormData");
                    },
                },
            ],
        );
    };
    
    const deleteSet = (originalIndex) => {
        remove(originalIndex);

        setDropdownDisabled((prev) => {
            const newDisabled = [...prev];
            newDisabled.splice(originalIndex, 1);
            return newDisabled;
        });

        try {
            realmInstance.write(() => {
                const exerciseToDelete = realmInstance.objects("WorkoutPresetsExercises")
                    .filtered("workoutPresets.id == $0", parseInt(id))[originalIndex];

                if (exerciseToDelete) {
                    realmInstance.delete(exerciseToDelete);
                }
            });
        } catch (error) {
            console.error("Error deleting exercise set from Realm:", error);
        }
    };
    
    useEffect(() => {
        getAllWorkedMuscles();
    }, [fields, watch("exercises")]);
    
    const groupExercisesByName = (exercises) => {
        const groups = [];
        if (exercises.length === 0) { return groups; }

        let currentGroup = { "name": exercises[0].name, "sets": [{ ...exercises[0], "originalIndex": 0 }] };
        for (let i = 1; i < exercises.length; i++) {
            if (exercises[i].name === exercises[i - 1].name) {
                currentGroup.sets.push({ ...exercises[i], "originalIndex": i });
            } else {
                groups.push(currentGroup);
                currentGroup = { "name": exercises[i].name, "sets": [{ ...exercises[i], "originalIndex": i }] };
            }
        }
        groups.push(currentGroup);
        return groups;
    };

    const getPersonalBest = (exerciseName) => {
        const exerciseRecords = realmInstance.objects("PreviousWorkoutsExercises")
            .filtered("exercises.name == $0", exerciseName)
            .sorted("metrics", true);
    
        return exerciseRecords.length > 0 ? `${exerciseRecords[0].metrics}kg x ${exerciseRecords[0].volume} reps` : "N/A";
    };

    const groupedExercises = groupExercisesByName(fields);

    return (
        <ScrollView style = {{ "backgroundColor": colours.main_background }}>
            <View className = "items-center m-[5px]">
                {saveTo === "previousWorkouts" && (
                    <View className = "w-11/12">
                        <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl">Workout Date</Text>
                        <TouchableOpacity onPress = {() => { return setShowDatePicker(true); }} className = "align-middle text-center w-full flex-1 m-2.5 bg-[#DEDEDE] p-3">
                            <Text>{workoutDate.toDateString()}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value = {workoutDate}
                                mode = "date"
                                display = {Platform.OS === "ios" ? "spinner" : "default"}
                                onChange = {(event, selectedDate) => {
                                    setShowDatePicker(false);
                                    if (selectedDate) { setWorkoutDate(selectedDate); }
                                }}
                            />
                        )}
                    </View>
                )}

                <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl">Workout Name</Text>
                <Controller
                    control = {control}
                    name = "workoutName"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                />
                <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl">Workout Notes</Text>
                <Controller
                    control = {control}
                    name = "workoutNotes"
                    render = {({ "field": { onChange, onBlur, value } }) => { return (
                        <TextInput onBlur = {onBlur} onChangeText = {onChange} value = {value} multiline = {true} numberOfLines = {3} className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"/>
                    ); }}
                /> 
                <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl mt-[30px]">Exercises</Text>
                <View className = "items-center flex justify-center">
                    {groupedExercises.map((group, groupIndex) => { return (
                        <View key = {`${group.name}-${groupIndex}`} className = "flex-initial flex-col w-full justify-between mt-[15px] flex-wrap items-center">
                            {group.sets.map((field, index) => { return (
                                <View key = {`${field.fieldId}-${index}`} className = "flex-row w-full">
                                    <View className = "bg-[#f0f0f0] items-center min-h-[100px] flex-1 m-2.5 p-{20px}">
                                        <Text style = {{ "color": colours.heading_colour_2 }} className = "flex-1 text-[15px] h-5">Exercise Name</Text>
                                        <DropdownComponent data = {names2} value = {watch(`exercises.${field.originalIndex}.name`)} onChange = {(name) => {
                                            setValue(`exercises.${field.originalIndex}.name`, name);
                                            setValue(`exercises.${field.originalIndex}.personalBest`, getPersonalBest(name));
                                            setDropdownDisabled((prev) => {
                                                const newDisabled = [...prev];
                                                newDisabled[field.originalIndex] = true;
                                                return newDisabled;
                                            });
                                            updateData();
                                        }} style = {{ "width": 100 }} placeholder = "Exercise Name" disabled = {dropdownDisabled[field.originalIndex]} />
                                    </View>
                                    <View className = "bg-[#f0f0f0] items-center min-h-[100px] flex-1 m-2.5 p-{20px}">
                                        <Text style = {{ "color": colours.heading_colour_2 }} className = "flex-1 text-[15px] h-5">Personal Best</Text>
                                        <Text className = "text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE] h-[27px] leading-[35px]">{watch(`exercises.${field.originalIndex}.personalBest`)}</Text>
                                    </View>
                                    <View className = "bg-[#f0f0f0] items-center min-h-[100px] flex-1 m-2.5 p-{20px}">
                                        <Text style = {{ "color": colours.heading_colour_2 }} className = "flex-1 text-[15px] h-5">Weight Size</Text>
                                        <Controller
                                            control = {control}
                                            name = {`exercises.${field.originalIndex}.duration`}
                                            render = {({ "field": { onChange, onBlur, value } }) => { return (
                                                <TextInput
                                                    onBlur = {onBlur}
                                                    onChangeText = {onChange}
                                                    value = {value}
                                                    keyboardType = "numeric"
                                                    className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"
                                                />
                                            ); }}
                                        />
                                    </View>
                                    <View className = "bg-[#f0f0f0] items-center min-h-[100px] flex-1 m-2.5 p-{20px}">
                                        <Text style = {{ "color": colours.heading_colour_2 }} className = "flex-1 text-[15px] h-5">Reps</Text>
                                        <Controller
                                            control = {control}
                                            name = {`exercises.${field.originalIndex}.reps`}
                                            render = {({ "field": { onChange, onBlur, value } }) => { return (
                                                <TextInput
                                                    onBlur = {onBlur}
                                                    onChangeText = {onChange}
                                                    value = {value}
                                                    keyboardType = "numeric"
                                                    className = "align-middle text-center w-11/12 flex-1 m-2.5 bg-[#DEDEDE]"
                                                />
                                            ); }}
                                        />
                                    </View>
                                    <TouchableOpacity 
                                        onPress = {() => { return deleteSet(field.originalIndex); }} 
                                        className = "ml-2 self-center mt-7"
                                    >
                                        <Ionicons name = "trash" size = {24} color = {colours.button_icon_2} />
                                    </TouchableOpacity>

                                </View>
                            ); })}
                            <TouchableOpacity onPress = {() => { return addSet(group.sets[0].originalIndex); }} className = {`mt-[10px] p-2 m-[5px] ${!watch(`exercises.${group.sets[0].originalIndex}.name`) ? "bg-gray-400" : "bg-[#2296f3]"}`} disabled = {!watch(`exercises.${group.sets[0].originalIndex}.name`)} >
                                <Text style = {{ "color": colours.button_background_2 }} className = "font-bold text-[16px]">Add Set</Text>
                            </TouchableOpacity>
                        </View>
                    );
                    })}
                </View>
                <TouchableOpacity onPress = {() => {
                    append({ "name": "", "duration": "", "reps": "" });
                    setDropdownDisabled((prev) => { return [...prev, false]; });
                }} className = "mt-[100px] bg-[#2296f3] p-2 m-[5px]">
                    <Text style = {{ "color": colours.button_background_2 }} className = "font-bold text-[16px]">Add Exercise</Text>
                </TouchableOpacity>
                <View className = "mt-10">
                    <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl text-center">Muscles Worked</Text>
                    <Text className = "text-center">{getAllWorkedMuscles().worked.join(", ")}</Text>
                    <Text style = {{ "color": colours.heading_colour_2 }} className = "text-xl text-center mt-5">Muscles Not Worked</Text>
                    <Text className = "text-center">{getAllWorkedMuscles().unworked.join(", ")}</Text>
                </View>
                <TouchableOpacity onPress = {handleSubmit(onSubmit)} className = "mt-[100px] bg-[#2296f3] p-2 m-[5px]">
                    <Text style = {{ "color": colours.button_background_2 }} className = "font-bold text-[16px]">Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {confirmReset} className = "mt-[10px] bg-[#00008b] p-2 m-[5px]" >
                    <Text style = {{ "color": colours.button_background_2 }} className = "font-bold text-[16px]">Reset Form</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

export default WorkoutForm;
