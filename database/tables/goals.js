import Realm from "realm";
import { Alert } from "react-native";

const goals = {
    "name": "Goals",
    "properties": {
        "id": "int",
        "name": { "type": "string", "maxLength": 50 },
        "startDate": "date", // TODO: Add a date picker for this field
        "endDate": "date", // TODO: Add a date picker for this field
        "reminders": "date", // TODO: Add a date picker for this field
        "notes": { "type": "string", "maxLength": 500 },
    },
    "primaryKey": "id",
};

const addGoal = (realm, goalName, goalStartDate, goalEndDate, goalReminders, goalNotes, setGoal, setGoalName, setGoalStartDate, setGoalEndDate, setGoalReminders, setGoalNotes) => {
    setIsLoading(true);
    try {
        if (goalName.trim() === "") {
            Alert.alert("Error", "Goal name is required!");
            return;
        }
        if (!goalStartDate) {
            Alert.alert("Error", "Goal start date is required");
            return;
        }
        if (!goalEndDate) {
            Alert.alert("Error", "Goal end date is required");
            return;
        }
        
        const existingGoal = realm.objects("Goals").filtered(`name = "${goalName}"`)[0];
        if (existingGoal) {
            Alert.alert("Error", "Goal name already exists");
            return;
        }

        const goalData = realm.objects("Goal");
        const maxId = goalData.length > 0 ? goalData.max("id") : 0;

        realm.write(() => {
            realm.create("Goals", {
                "id": maxId + 1,
                "name": goalName,
                "startDate": goalStartDate,
                "endDate": goalEndDate,
                "reminders": goalReminders,
                "notes": goalNotes,
            });
            setGoal([...realm.objects("Goals")]); // Refresh the goal list
            setGoalName("");
            setGoalStartDate("");
            setGoalEndDate("");
            setGoalReminders("");
            setGoalNotes("");
        });
    } catch (error) {
        Alert.alert("Error", error.message);
    } finally {
        setIsLoading(false);
    }
};

const deleteGoal = (realm, goal, setGoals, setIsLoading) => {
    setIsLoading(true);
    try {
        if (!goal) {
            Alert.alert("Error", "Goal not found!");
            return;
        }
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this goal?",
            [
                {
                    "text": "Cancel",
                    "onPress": () => {
                        setIsLoading(false);
                    },
                },
                {
                    "text": "Delete",
                    "onPress": () => {
                        realm.write(() => {
                            realm.delete(goal);
                            setGoals([...realm.objects("Goals")]); // Refresh the goals list
                            setIsLoading(false);
                        });
                    },
                },
            ],
        );
    } catch (error) {
        Alert.alert("Error", error.message);
    } finally {
        setIsLoading(false);
    }
};

const editGoal = (realm, goal, setGoal, goalName, setIsLoading) => {
    setIsLoading(true);
    try {
        if (!goal) {
            Alert.alert("Error", "Goal not found!");
            return;
        }
        const editedGoal = realm.objects("Goals").filtered(`id = ${goal.id}`)[0];
        realm.write(() => { editedGoal.name = goalName; });
        if (!goalName) {
            Alert.alert("Error", "Goal not found!");
            setIsLoading(false);
            return;
        }
        setGoal(realm.objects("Goals").toJSON()); // Refresh the goals list
    } catch (error) {
        Alert.alert("Error", error.message);
    } finally {
        setIsLoading(false);
    }
};

export { goals, addGoal, deleteGoal, editGoal };
