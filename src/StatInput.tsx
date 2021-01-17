import { tw } from "twind"

export default function StatInput({
	value,
	onTextChange,
}: {
	value: string
	onTextChange: (text: string) => void
}) {
	return (
		<input
			class={tw`w-full px-3 py-2 text-center transition-colors duration-200 border-2 border-gray-300 rounded-md shadow-inner focus:outline-none focus:border-orange-500`}
			value={value}
			onInput={(event) => onTextChange?.(event.currentTarget.value)}
			onFocus={(event) => event.currentTarget.select()}
		/>
	)
}
