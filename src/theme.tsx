import { Moon, Sun } from "preact-feather"
import { useEffect, useState } from "preact/hooks"
import { SolidButton } from "./solid-button"

export function ThemeButton() {
	const [darkMode, setDarkMode] = useState(() =>
		typeof window !== "undefined"
			? localStorage.getItem("darkMode") === "true"
			: false,
	)

	useEffect(() => {
		localStorage.setItem("darkMode", darkMode ? "true" : "false")
		document.documentElement.classList.toggle("dark", darkMode)
	}, [darkMode])

	return (
		<SolidButton
			type="button"
			title="Toggle theme"
			onClick={() => setDarkMode(!darkMode)}
		>
			{darkMode ? <Moon /> : <Sun />}
		</SolidButton>
	)
}
