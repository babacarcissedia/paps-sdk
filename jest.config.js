module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  verbose: true,
  testTimeout: 10000,
  roots: ['<rootDir>/src', '<rootDir>/test'],
  coveragePathIgnorePatterns: ['<rootDir>/test/', '<rootDir>/node_modules'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!**/node_modules/**',
  ],
  coverageDirectory: './coverage',
  bail: 1,
  coverageReporters: ['json', 'html', 'text'],
  testRegex: '(\\.(test|spec))\\.(tsx?)$',
  testURL: 'http://localhost/', // https://github.com/facebook/jest/issues/6769
}

// verbose: true,
// testTimeout: 5000,
// bail: true,
// cache: false,
// collectCoverage: false,
