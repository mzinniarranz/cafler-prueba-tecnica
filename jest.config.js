module.exports = {
    clearMocks: true,
    moduleNameMapper: {
        "\\.(css)$": "<rootDir>/src/__mocks__/styleMock.js",
    },
    testEnvironment: "jsdom",
    transformIgnorePatterns: [
        "/node_modules/(?!react-dnd|core-dnd|@react-dnd|dnd-core|react-dnd-html5-backend)",
    ],
};
