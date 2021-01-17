import clsx from "clsx"

export default function StatInput({
	onTextChange,
	...props
}: React.ComponentPropsWithoutRef<"input"> & {
	onTextChange?: (text: string) => void
}) {
	return (
		<input
			{...props}
			className={clsx(
				"w-full px-3 py-2 text-center transition-colors duration-200 border-2 border-gray-300 rounded-md shadow-inner focus:outline-none focus:border-orange-500",
				props.className,
			)}
			onChange={(event) => {
				onTextChange?.(event.target.value)
				props.onChange?.(event)
			}}
			onFocus={(event) => {
				event.target.select()
				props.onFocus?.(event)
			}}
		/>
	)
}
