import {} from "preact"
import { Token } from "twind"

declare module "preact" {
	namespace JSX {
		interface HTMLAttributes {
			tw?: Token
		}
	}
}
