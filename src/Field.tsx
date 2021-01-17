import type { ComponentChildren } from "preact"
import { tw } from "twind"

export default function Field({
	label,
	children,
}: {
	label: ComponentChildren
	children: ComponentChildren
}) {
	return (
		<label class={tw`space-y-1`}>
			<div class={tw`text-sm`}>{label}</div>
			{children}
		</label>
	)
}
