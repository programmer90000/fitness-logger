import Realm from "realm";
import { Alert } from "react-native";

const goals = {
    "name": "Goals",
    "properties": {
        "id": "int",
        "name": "string",
        "startDate": "date", // TODO: Add a date picker for this field
        "endDate": "date", // TODO: Add a date picker for this field
        "reminders": "date", // TODO: Add a date picker for this field
        "notes": "string",
    },
    "primaryKey": "id",
};


export { goals };
