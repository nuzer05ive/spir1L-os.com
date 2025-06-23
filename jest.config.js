module.exports = {
  projects: [
    {
      displayName: 'hv221',
      testMatch: ['<rootDir>/src/__tests__/hv221.*.ts'],
      transform: {
        '^.+\\.ts$': ['ts-jest', { tsconfig: './tsconfig.json' }]
      }
    }
  ]
};
