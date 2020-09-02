module.exports = {
	purge: ["{src,{public}}/**/*.{vue,html}"],
	theme: {
		fontFamily: {
			body: `Rubik, sans-serif`,
		},
		extend: {},
	},
	variants: {},
	plugins: [],
	future: {
		removeDeprecatedGapUtilities: true,
	},
}
