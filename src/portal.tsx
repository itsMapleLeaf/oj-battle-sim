import type { ComponentChildren } from "preact"
import { createPortal } from "preact/compat"
import { useEffect, useRef } from "preact/hooks"

export function Portal({ children }: { children: ComponentChildren }) {
	const containerRef = useRef<HTMLElement>()
	if (typeof window !== "undefined" && !containerRef.current) {
		const element = document.createElement("react-portal")
		document.body.append(element)
		containerRef.current = element
	}

	useEffect(() => {
		return () => {
			containerRef.current?.remove()
		}
	}, [])

	if (!containerRef.current) {
		return null
	}

	return createPortal(<>{children}</>, containerRef.current)
}
