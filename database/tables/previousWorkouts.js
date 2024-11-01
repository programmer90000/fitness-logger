import Realm from "realm";
import { Alert } from "react-native";

const previousWorkouts = {
    "name": "PreviousWorkouts",
    "properties": {
        "id": "int",
        "name": "string",
        "notes": "string",
        "date": "date", // TODO: Add a date picker for this field
    },
    "primaryKey": "id",
};


export { previousWorkouts };
