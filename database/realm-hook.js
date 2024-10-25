import { useState, useEffect } from "react";
import Realm from "realm";

const openTable = (tableName) => {
    const [realm, setRealm] = useState(null);
    const [realmData, setRealmData] = useState({ "tableName": [] });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Realm.open({ "schema": [tableName] })
            .then((realmInstance) => {
                setRealm(realmInstance);
                const tableNameData = realmInstance.objects([tableName]);
                setRealmData(tableNameData);
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

export { openTable };
