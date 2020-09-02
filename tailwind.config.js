module.exports = {
	purge: ["{src,{public}}/**/*.{vue,html}"],
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
