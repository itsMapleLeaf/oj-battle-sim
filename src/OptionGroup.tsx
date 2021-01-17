import type { ComponentChildren } from "preact"
import { tw } from "twind"

type Props<T> = {
	name: string
	options: Option<T>[]
	value: T
	onChange: (value: T) => void
}

type Option<T> = {
	value: T
	text: ComponentChildren
}

export default function OptionGroup<T>({
	name,
	options,
	value,
	onChange,
}: Props<T>) {
	const getLabelClass = (option: Option<T>) => {
		const activeClass =
			value === option.value
				? "bg-orange-600 text-white"
				: "hover:bg-orange-200"

		return tw`px-3 py-2 transition-colors duration-200 cursor-pointer ${activeClass}`
	}

	return (
		<div
			class={tw`flex flex-row overflow-hidden transition-colors duration-200 border-2 rounded-md focus-within:border-orange-500`}
		>
			{options.map((opt, index) => (
				<label key={index} class={getLabelClass(opt)}>
					<input
						type="radio"
						class={tw`absolute opacity-0`}
						name={name}
						checked={opt.value === value}
						onChange={() => onChange(opt.value)}
					/>
					<span class={tw`select-none`}>{opt.text}</span>
				</label>
			))}
		</div>
	)
}
