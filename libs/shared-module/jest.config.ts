/* eslint-disable */
export default {
	displayName: 'shared-module',
	preset: '../../../jest.preset.js',
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }]
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory: '../../../coverage/sdk/libs/shared-module'
};
