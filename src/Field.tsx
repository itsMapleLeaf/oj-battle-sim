import { ComponentChildren } from "preact"

export default function Field({
	label,
	children,
}: {
	label: ComponentChildren
	children: ComponentChildren
}) {
	return (
		<label className="space-y-1">
			<div className="text-sm">{label}</div>
			{children}
		</label>
	)
}
