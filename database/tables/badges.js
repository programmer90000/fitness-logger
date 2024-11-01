import Realm from "realm";
import { Alert } from "react-native";

const badges = {
    "name": "Badges",
    "properties": {
        "id": "int",
        "image": "string", // TODO: Add an image picker for this field
        "text": "string",
        "completed": "bool",
    },
    "primaryKey": "id",
};


const initialBadges = [
    // { id: 1, image: "path/to/badge1.png", text: "Badge 1", completed: false },
    // { id: 2, image: "path/to/badge2.png", text: "Badge 2", completed: false },
];

const toggleBadgeCompletion = (realm, badgeId, setBadges) => {
    try {
        const badge = realm.objects("Badges").filtered(`id = ${badgeId}`)[0];
        if (!badge) {
            Alert.alert("Error", "Badge not found!");
            return;
        }

        realm.write(() => {
            badge.completed = !badge.completed;
            setBadges([...realm.objects("Badges")]); // Refresh the badges list
        });
    } catch (error) {
        Alert.alert("Error", error.message);
    }
};

export { badges, toggleBadgeCompletion };
