import { useState, useEffect } from "react";
import Realm from "realm";
import { badges } from "../database/tables/badges";
import { exercises } from "../database/tables/exercises";
import { goals } from "../database/tables/goals";
import { previousWorkouts } from "../database/tables/previousWorkouts";
import { workoutPresets } from "../database/tables/workoutPresets.js";

export const useRealmTasks = () => {
    const [realm, setRealm] = useState(null);
    const [realmData, setRealmData] = useState({
        "badges": [],
        "exercises": [],
        "goals": [],
        "previousWorkouts": [],
        "workoutPresets": [],

    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Realm.open({ "schema": [badges, exercises, goals, previousWorkouts, workoutPresets] })
            .then((realmInstance) => {
                setRealm(realmInstance);
                const badges = realmInstance.objects("badges");
                const exercises = realmInstance.objects("exercises");
                const goals = realmInstance.objects("goals");
                const previousWorkouts = realmInstance.objects("previousWorkouts");
                const workoutPresets = realmInstance.objects("workoutPresets");

                setRealmData({
                    "badges": [...badges],
                    "exercises": [...exercises],
                    "goals": [...goals],
                    "previousWorkouts": [...previousWorkouts],
                    "workoutPresets": [...workoutPresets],
                });
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error opening Realm:", error);
                setIsLoading(false);
            });

        return () => {
            if (realm) {
                realm.close();
            }
        };
    }, []);
    return { realm, realmData, isLoading, setIsLoading };
};
