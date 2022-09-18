import type { Signal } from "@preact/signals"
import classNames from "classnames"
import { Fragment } from "preact/jsx-runtime"
import { controlBorderClass } from "./styles"

export function OptionGroup<T extends string>({
	name,
	options,
	valueSignal,
}: {
	name: string
	options: { label: string; value: T }[]
	valueSignal: Signal<T>
}) {
	return (
		<div
			class={classNames(
				controlBorderClass,
				"flex border-2 rounded-md w-fit overflow-clip",
			)}
		>
			{options.map(({ label, value }) => (
				<Fragment key={value}>
					<label>
						<input
							type="radio"
							id="attackerReaction"
							name={name}
							class="peer sr-only"
							value={value}
							checked={valueSignal.value === value}
							onChange={() => {
								valueSignal.value = value
							}}
						/>
						<div class="peer-checked:bg-orange-600 peer-checked:text-white leading-none p-3 hover:bg-orange-400/30 transition cursor-pointer dark:bg-black/20  dark:hover:bg-orange-400/20 dark:peer-checked:hover:bg-orange-600 select-none">
							{label}
						</div>
					</label>
				</Fragment>
			))}
		</div>
	)
}
