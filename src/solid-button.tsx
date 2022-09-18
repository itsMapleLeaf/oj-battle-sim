import type { JSX } from "preact"

export function SolidButton(props: JSX.HTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			type="button"
			class="flex flex-col self-center p-2 space-y-4 text-white transition-colors duration-200 bg-orange-600 rounded-md shadow-md hover:bg-orange-700 focus:outline-none focus-visible:ring ring-orange-800"
			{...props}
		/>
	)
}
