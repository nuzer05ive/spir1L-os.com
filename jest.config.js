/** @type {import('jest').Config} */
module.exports = {
  rootDir: '.',
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/spir1L-os.com'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }]
  },
  testMatch: ['<rootDir>/src/__tests__/**/*.spec.ts']
};
