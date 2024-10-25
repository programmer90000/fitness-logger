import { useState, useEffect } from "react";
import Realm from "realm";

const openTable = (tableName) => {
    const [realm, setRealm] = useState(null);
    const [realmData, setRealmData] = useState({ [tableName]: [] });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const realmInstance = await Realm.open({ "schema": [tableName] });
                setRealm(realmInstance);
                const tableNameData = realmInstance.objects(tableName);
                setRealmData({ [tableName]: tableNameData });
                setIsLoading(false);
            } catch (error) {
                console.error("Error opening Realm:", error);
                setIsLoading(false);
            }
        };
        fetchData();

        return () => {
            if (realm) {
                realm.close();
            }
        };
    }, [tableName]);
    return { realm, realmData, isLoading, setIsLoading };
};

export { openTable };
