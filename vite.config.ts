import prefresh from "@prefresh/vite"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [prefresh()],
	esbuild: {
		jsxInject: `import { h, Fragment } from 'preact'`,
		jsxFactory: "h",
		jsxFragment: "Fragment",
	},
	optimizeDeps: {
		include: ["twind/colors"],
	},
})
