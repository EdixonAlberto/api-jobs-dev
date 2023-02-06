// deno-lint-ignore no-empty-interface
interface IProps {}

export function Docs(props: IProps) {
	return (
		<html>
			<head>
				<link rel='stylesheet' href='/static/style.css' />
				<title>Docs the API Getonboard</title>
			</head>
			<body>
				<h1>Documentation</h1>
			</body>
		</html>
	)
}
