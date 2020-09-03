import clsx from "clsx"
import { useEffect, useRef, useState } from "react"

export default function StatInput({
	defaultValue,
	onValueChange,
	...props
}: React.ComponentPropsWithoutRef<"input"> & {
	defaultValue: number
	onValueChange: (value: number) => void
}) {
	const [internalValue, setInternalValue] = useState(String(defaultValue ?? ""))

	const onValueChangeRef = useRef(onValueChange)
	useEffect(() => {
		onValueChangeRef.current = onValueChange
	})

	useEffect(() => {
		const newValue = Number(internalValue)
		if (newValue) {
			onValueChangeRef.current(newValue)
		}
	}, [internalValue])

	return (
		<input
			{...props}
			value={internalValue}
			className={clsx(
				"w-full px-3 py-2 text-center transition-colors duration-200 border-2 border-gray-300 rounded-md shadow-inner focus:outline-none focus:border-orange-500",
				props.className,
			)}
			onChange={(event) => {
				setInternalValue(event.target.value)
			}}
			onFocus={(event) => {
				event.target.select()
				props.onFocus?.(event)
			}}
		/>
	)
}
