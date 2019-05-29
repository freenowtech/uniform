module.exports = {
    collectCoverageFrom: ['src/**/*.js', '!src/index.js', '!src/types/**/*.js'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    setupFilesAfterEnv: ['<rootDir>internals/setupTests.js'],
};
