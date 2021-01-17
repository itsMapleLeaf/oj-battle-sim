import { render } from "preact"
import { setup } from "twind"
import App from "./App"
import { twindConfig } from "./twind-config"

setup(twindConfig)
render(<App />, document.querySelector("#app")!)
