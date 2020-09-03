import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from "next/document"

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)
		return initialProps
	}
	render() {
		return (
			<Html
				lang="en"
				className="min-h-full font-body bg-gradient-to-t from-orange-300 to-orange-100"
			>
				<Head>
					<script
						async
						src="https://www.googletagmanager.com/gtag/js?id=UA-177054174-1"
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `window.dataLayer = window.dataLayer || [];function gtag() { dataLayer.push(arguments);};gtag("js", new Date());gtag("config", "UA-177054174-1")`,
						}}
					/>

					<meta charSet="UTF-8" />

					<link rel="icon" href="/favicon.ico" />
					<link
						href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
						rel="stylesheet"
					/>
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
