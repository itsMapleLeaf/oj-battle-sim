import { effect, signal } from "@preact/signals"
import { Moon, Sun } from "preact-feather"
import { SolidButton } from "./solid-button"

const darkMode = signal(localStorage.getItem("darkMode") === "true")
effect(() => {
	localStorage.setItem("darkMode", darkMode.value ? "true" : "false")
	document.documentElement.classList.toggle("dark", darkMode.value)
})

export function ThemeButton() {
	return (
		<SolidButton
			type="button"
			title="Toggle theme"
			onClick={() => {
				darkMode.value = !darkMode.value
			}}
		>
			{darkMode.value ? <Moon /> : <Sun />}
		</SolidButton>
	)
}
