const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest');

const paths = compilerOptions.paths || {};

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',

  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  moduleNameMapper: {
    // Los alias propios del proyecto, excepto @prisma/*
    ...pathsToModuleNameMapper(
      Object.fromEntries(
        Object.entries(paths).filter(([alias]) => alias !== '@prisma/*'),
      ),
      { prefix: '<rootDir>/' },
    ),
  },

  coverageDirectory: './coverage',
  testEnvironment: 'node',
};