import "@twind/macro"
import { ComponentChildren } from "preact"

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
	const getLabelClass = (option: Option<T>) =>
		`px-3 py-2 transition-colors duration-200 cursor-pointer ${
			value === option.value
				? "bg-orange-600 text-white"
				: "hover:bg-orange-200"
		}`

	return (
		<div tw="flex flex-row overflow-hidden transition-colors duration-200 border-2 rounded-md focus-within:border-orange-500">
			{options.map((opt, index) => (
				<label key={index} tw={getLabelClass(opt)}>
					<input
						type="radio"
						tw="absolute opacity-0"
						name={name}
						checked={opt.value === value}
						onChange={() => onChange(opt.value)}
					/>
					<span tw="select-none">{opt.text}</span>
				</label>
			))}
		</div>
	)
}
