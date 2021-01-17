import babel from "@babel/core"
import type { Plugin } from "vite"

export default function babelMacros(): Plugin {
	return {
		name: "babel-macros",
		enforce: "pre",
		transform(code, filename) {
			if (/(js|ts)x?$/.test(filename)) {
				return babel.transformAsync(code, {
					plugins: [
						"macros",
						"@babel/syntax-jsx",
						["@babel/syntax-typescript", { isTSX: true }],
					],
					configFile: false,
					babelrc: false,
					filename,
				})
			}
		},
	}
}
