import preactRefresh from "@prefresh/vite"
import { defineConfig } from "vite"
import babelMacros from "./plugins/babel-macros"

export default defineConfig({
	plugins: [preactRefresh(), babelMacros()],
	esbuild: {
		jsxInject: `import { h, Fragment } from 'preact'`,
		jsxFactory: "h",
		jsxFragment: "Fragment",
	},
	optimizeDeps: {
		include: ["twind/colors"],
	},
})
