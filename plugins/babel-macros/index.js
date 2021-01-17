const babel = require("@babel/core")

/** @returns {import('vite').Plugin} */
module.exports = function babelMacros() {
	return {
		name: "babel-macros",
		enforce: "pre",
		transform(code, filename) {
			if (/(js|ts)x?$/.test(filename)) {
				return babel.transformAsync(code, {
					plugins: [
						require("babel-plugin-macros"),
						require("@babel/plugin-syntax-jsx"),
						[require("@babel/plugin-syntax-typescript"), { isTSX: true }],
					],
					configFile: false,
					babelrc: false,
					filename,
				})
			}
		},
	}
}
