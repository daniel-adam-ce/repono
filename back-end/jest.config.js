/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "moduleFileExtensions": [
    "ts",
    "js"
  ],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
}
};