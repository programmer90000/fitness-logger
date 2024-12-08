import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, newValue, consoleLog) => {
    try {
        await AsyncStorage.setItem(key, newValue);
            
        if (consoleLog) {
            const storedValue = await AsyncStorage.getItem(key);
            console.log(`Retrieved ${key}: ${storedValue}`);
        }
    } catch (e) {
        console.log(e);
    }
};

const retrieveData = async (key) => {
    try {
        return jsonValue = await AsyncStorage.getItem(key);
    } catch (error) {
        console.log(`Error retrieveing value: ${error} `);
    }
};

export { storeData, retrieveData };
