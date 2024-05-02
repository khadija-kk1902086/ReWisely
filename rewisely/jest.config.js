module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$":"babel-jest",
    },
    
        setupFiles: ['./jest.setup.js'], // Specify the path to your setup file

}