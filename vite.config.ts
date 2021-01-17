import prefresh from "@prefresh/vite"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [prefresh()],
	alias: {
		react: "preact/compat",
		"react-dom": "preact/compat",
	},
	esbuild: {
		jsxInject: `import { h, Fragment } from 'preact'`,
		jsxFactory: "h",
		jsxFragment: "Fragment",
	},
	optimizeDeps: {
		include: ["twind/colors"],
	},
})
