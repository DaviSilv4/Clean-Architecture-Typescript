modelu.exports = {
    roots: ['<rooDir>/src'],
    testEnvironments: 'node',
    transform: {
        '.+\\.ts$': 'ts-jest'
    },
    modeleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1'
    }
}