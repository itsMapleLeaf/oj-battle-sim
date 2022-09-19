/** @type {import('prettier').Config} */
module.exports = {
	semi: false,
	trailingComma: "all",
	useTabs: true,
	htmlWhitespaceSensitivity: "ignore",
	plugins: [require.resolve("prettier-plugin-astro")],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
}
