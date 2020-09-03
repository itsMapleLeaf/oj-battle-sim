import clsx from "clsx"

export default function Field({
	label,
	children,
	...props
}: React.ComponentPropsWithoutRef<"label"> & { label: React.ReactNode }) {
	return (
		<label {...props} className={clsx("space-y-1", props.className)}>
			<div className="text-sm">{label}</div>
			{children}
		</label>
	)
}
