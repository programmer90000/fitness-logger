import Realm from "realm";
import { Alert } from "react-native";

const workoutPresets = {
    "name": "WorkoutPresets",
    "properties": {
        "id": "int",
        "name": "string",
        "notes": "string",
    },
    "primaryKey": "id",
};

export { workoutPresets };
