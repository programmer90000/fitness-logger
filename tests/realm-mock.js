const mockRealm = {
    "objects": jest.fn(() => {
        const results = [];
        results.filtered = jest.fn(() => { return results; });
        results.map = jest.fn(() => { return []; });
        return results;
    }),
    "write": jest.fn((callback) => { return callback(); }),
    "create": jest.fn(),
    "deleteAll": jest.fn(),
    "close": jest.fn(),
    "addListener": jest.fn(),
    "removeListener": jest.fn(),
};

mockRealm.open = jest.fn().mockResolvedValue(mockRealm);
mockRealm.schema = [
    {
        "name": "WorkoutPresets",
        "properties": {
            "id": "int",
            "name": "string",
            "notes": "string",
        },
        "primaryKey": "id",
    },
    {
        "name": "Exercises",
        "properties": {
            "id": "int",
            "name": "string",
            "type": "string",
            "notes": "string",
            "video": "string",
            "personalBest": "string",
            "isDeleted": { "type": "bool", "default": false },
        },
        "primaryKey": "id",
    },
    {
        "name": "WorkoutPresetsExercises",
        "properties": {
            "id": "int",
            "workoutPresets": "WorkoutPresets",
            "exercises": "Exercises",
            "metrics": "string",
            "volume": "string",
        },
        "primaryKey": "id",
    },
    {
        "name": "PreviousWorkouts",
        "properties": {
            "id": "int",
            "name": "string",
            "notes": "string",
            "date": "date",
        },
        "primaryKey": "id",
    },
    {
        "name": "PreviousWorkoutsExercises",
        "properties": {
            "id": "int",
            "previousWorkouts": "PreviousWorkouts",
            "exercises": "Exercises",
            "metrics": "string",
            "volume": "string",
        },
        "primaryKey": "id",
    },
    {
        "name": "Goals",
        "properties": {
            "id": "int",
            "name": "string",
            "type": "string",
            "value": "string",
            "startDate": "date",
            "endDate": "date",
            "reminders": "date",
            "notes": "string",
        },
        "primaryKey": "id",
    },
    {
        "name": "Badges",
        "properties": {
            "id": "int",
            "image": "string",
            "text": "string",
            "completed": "bool",
        },
        "primaryKey": "id",
    },
];

mockRealm.deleteRealmIfMigrationNeeded = true;

module.exports = jest.fn(() => { return mockRealm; });
