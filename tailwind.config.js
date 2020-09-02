module.exports = {
	purge: ["./src/**/*.vue", "./index.html"],
	theme: {
		fontFamily: {
			body: `Rubik, sans-serif`,
		},
		extend: {},
	},
	variants: {
		borderColor: ["hover", "focus", "focus-within"],
	},
	plugins: [],
	future: {
		removeDeprecatedGapUtilities: true,
	},
}
