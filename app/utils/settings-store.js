const settings = {
    "theme": "light",
    "weight": "metric",
    "distance": "kilometers",
};

const settingsWatcher = [];

const getSettings = () => { return { ...settings }; };

const notifySettingsWatcher = () => {
    settingsWatcher.forEach((settingWatcher) => { return settingWatcher(getSettings()); });
};


const updateSetting = (key, value) => {
    if (key in settings) {
        settings[key] = value;
        console.log(`Setting "${key}" updated to: ${value}`);
        console.log("New settings object:", getSettings());
        notifySettingsWatcher();
    } else {
        console.warn(`Setting "${key}" does not exist.`);
    }
};

const subscribeToSettings = (setting) => {
    settingsWatcher.push(setting);
    return () => {
        const index = settingsWatcher.indexOf(setting);
        if (index >= 0) {
            settingsWatcher.splice(index, 1);
        }
    };
};

export { getSettings, updateSetting, subscribeToSettings };
