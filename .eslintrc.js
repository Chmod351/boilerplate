
module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	rules: {
		indent: ['error', 'tab'],
		'sort-imports': ['error', {
			allowSeparatedGroups: true,
			ignoreCase: false,
			ignoreDeclarationSort: false,
			ignoreMemberSort: false,
			memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
		}],
	},
	extends: ["eslint:recommended"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	overrides: [
		{
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
			plugins: ["@typescript-eslint"],
			extends: [
				"plugin:@typescript-eslint/recommended",
			],
		},
	],
};
