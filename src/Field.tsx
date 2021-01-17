import "@twind/macro"
import type { ComponentChildren } from "preact"

export default function Field({
	label,
	children,
}: {
	label: ComponentChildren
	children: ComponentChildren
}) {
	return (
		<label tw="space-y-1">
			<div tw="text-sm">{label}</div>
			{children}
		</label>
	)
}
