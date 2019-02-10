module.exports = {
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  modulePaths: ['src'],
  setupFilesAfterEnv: [
    '<rootDir>/test/enzyme.config.js',
    '<rootDir>/test/reactTestingLibrary.config.js',
  ],
};
