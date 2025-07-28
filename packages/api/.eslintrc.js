module.exports = {
	root: true,
	env: {
		node: true,
		commonjs: true,
		es6: true,
		jquery: false,
	},
	extends: [
		"eslint:recommended",
		"plugin:prettier/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	plugins: ["prettier", "@typescript-eslint"],
	parser: "@typescript-eslint/parser",
	rules: {
		"prettier/prettier": "warn",
	},
};
