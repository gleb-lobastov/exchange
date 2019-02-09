module.exports = {
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  setupFilesAfterEnv: ['<rootDir>/test/enzyme.config.js'],
};
