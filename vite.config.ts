import prefresh from "@prefresh/vite"
import { defineConfig } from "vite"
import macros from "vite-plugin-babel-macros"

export default defineConfig({
	plugins: [prefresh(), macros()],
	esbuild: {
		jsxInject: `import { h, Fragment } from 'preact'`,
		jsxFactory: "h",
		jsxFragment: "Fragment",
	},
	optimizeDeps: {
		include: ["twind/colors"],
	},
})
