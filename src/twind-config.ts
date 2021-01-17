import type { Configuration } from "twind"
import * as colors from "twind/colors"

export const twindConfig: Configuration = {
	theme: {
		fontFamily: {
			body: `Rubik, sans-serif`,
		},
		extend: {
			colors: {
				orange: colors.orange,
			},
		},
	},
	preflight: {
		":root": ({ theme }) => ({
			background: `linear-gradient(to top, ${theme(
				"colors.orange.300",
			)}, ${theme("colors.orange.100")})`,
			minHeight: "100%",
			fontFamily: theme("fontFamily.body"),
			display: "flex",
			flexDirection: "column",
		}),
		body: {
			margin: "auto",
		},
	},
}
