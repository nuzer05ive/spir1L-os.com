/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/spir1L-os.com'],
  projects: [
    {
      displayName: 'hv221',
      testMatch: ['<rootDir>/src/__tests__/**/hv221.spec.ts'],
      transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }] }
    },
    {
      displayName: 'pxk',
      testMatch: ['<rootDir>/src/__tests__/**/portal.spec.ts'],
      transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }] }
    },
    {
      displayName: 'lex',
      testMatch: ['<rootDir>/spirill-rii-toolchain/**/__tests__/**/*.spec.ts'],
      transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }] }
    },
    {
      displayName: 'parse',
      testMatch: ['<rootDir>/spirill-rii-toolchain/parse/**/__tests__/**/*.spec.ts'],
      transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }] }
    }
  ]
};
