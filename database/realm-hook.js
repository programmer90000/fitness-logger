import { useState, useEffect } from "react";
import Realm from "realm";
import { badges } from "../database/tables/badges";
import { exercises } from "../database/tables/exercises";
import { goals } from "../database/tables/goals";
import { previousWorkouts } from "../database/tables/previousWorkouts";
import { workoutPresets } from "../database/tables/workoutPresets.js";

const openBadgesTable = () => {
    const [realm, setRealm] = useState(null);
    const [realmData, setRealmData] = useState({
        "badges": [],
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Realm.open({ "schema": [badges] })
            .then((realmInstance) => {
                setRealm(realmInstance);
                const badges = realmInstance.objects("badges");
                setRealmData({
                    "badges": [...badges],
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

const openExercisesTable = () => {
    const [realm, setRealm] = useState(null);
    const [realmData, setRealmData] = useState({
        "exercises": [],
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Realm.open({ "schema": [exercises] })
            .then((realmInstance) => {
                setRealm(realmInstance);
                const exercises = realmInstance.objects("exercises");
                setRealmData({
                    "exercises": [...exercises],
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

const openGoalsTable = () => {
    const [realm, setRealm] = useState(null);
    const [realmData, setRealmData] = useState({
        "goals": [],
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Realm.open({ "schema": [goals] })
            .then((realmInstance) => {
                setRealm(realmInstance);
                const goals = realmInstance.objects("goals");

                setRealmData({
                    "goals": [...goals],
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

const openPreviousWorkoutsTable = () => {
    const [realm, setRealm] = useState(null);
    const [realmData, setRealmData] = useState({
        "previousWorkouts": [],
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Realm.open({ "schema": [previousWorkouts] })
            .then((realmInstance) => {
                setRealm(realmInstance);
                const previousWorkouts = realmInstance.objects("previousWorkouts");

                setRealmData({
                    "previousWorkouts": [...previousWorkouts],
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

const openWorkoutPresetsTable = () => {
    const [realm, setRealm] = useState(null);
    const [realmData, setRealmData] = useState({
        "workoutPresets": [],

    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Realm.open({ "schema": [workoutPresets] })
            .then((realmInstance) => {
                setRealm(realmInstance);
                const workoutPresets = realmInstance.objects("workoutPresets");

                setRealmData({
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

export { openBadgesTable, openExercisesTable, openGoalsTable, openPreviousWorkoutsTable, openWorkoutPresetsTable };
