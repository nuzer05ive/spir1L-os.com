/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/spir1L-os.com'],
  projects: [
    {
      displayName: 'hv221',
      testMatch: ['<rootDir>/src/__tests__/**/*.spec.ts'],
      transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }] }
    }
  ]
};
