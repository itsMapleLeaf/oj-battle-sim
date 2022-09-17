import type { ComponentChildren } from "preact"

export default function Field({
	label,
	children,
}: {
	label: ComponentChildren
	children: ComponentChildren
}) {
	return (
		<label class="space-y-1">
			<div class="text-sm">{label}</div>
			{children}
		</label>
	)
}
