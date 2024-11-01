import Realm from "realm";
import { Alert } from "react-native";

const exercises = {
    "name": "Exercises",
    "properties": {
        "id": "int",
        "name": "string",
        "type": "string", // TODO: Add a dropdown picker for this field
        "notes": "string",
        "video": "string", // TODO: Add a file picker to add videos to this field
    },
    "primaryKey": "id",
};

export { exercises };
