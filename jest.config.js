/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [
    {
      displayName: 'hv221',
      testMatch: ['<rootDir>/src/__tests__/hv221.spec.ts'],
    },
  ],
};
