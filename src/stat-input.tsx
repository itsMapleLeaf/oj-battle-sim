import type { Signal } from "@preact/signals"
import classNames from "classnames"
import type { ComponentChildren } from "preact"
import { textInputClass } from "./styles"

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
				inputMode="numeric"
				class={classNames(textInputClass, "text-center appearance-none")}
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
