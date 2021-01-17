import type { AppProps } from "next/app"
import Head from "next/head"
import "../styles/index.css"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>OJ Battle Sim</title>
			</Head>
			<Component {...pageProps} />
		</>
	)
}
