import type { Signal } from "@preact/signals"
import type { ComponentChildren } from "preact"

export function StatInput({
	label,
	valueSignal,
}: {
	label: ComponentChildren
	valueSignal: Signal<string>
}) {
	return (
		<label>
			<div class="text-sm font-medium mb-2 leading-none">{label}</div>
			<input
				class="border-2 border-stone-300 dark:border-stone-500 shadow-inner rounded-md focus:bg-black-30 leading-none w-full p-3 text-center dark:bg-black/20  focus:outline-none focus:border-orange-500 dark:focus:border-orange-500"
				value={valueSignal.value}
				onInput={(event) => {
					valueSignal.value = event.currentTarget.value
				}}
				onFocus={(event) => {
					event.currentTarget.select()
				}}
				onKeyDown={(event) => {
					const numberValue = Number(event.currentTarget.value)
					if (event.key === "ArrowUp") {
						valueSignal.value = Number.isFinite(numberValue)
							? String(numberValue + 1)
							: "0"
					}
					if (event.key === "ArrowDown") {
						valueSignal.value = Number.isFinite(numberValue)
							? String(numberValue - 1)
							: "0"
					}
				}}
			/>
		</label>
	)
}
