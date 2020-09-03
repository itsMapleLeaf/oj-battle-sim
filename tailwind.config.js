module.exports = {
	purge: ["./{components,pages}/**.*.{ts,tsx}"],
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
