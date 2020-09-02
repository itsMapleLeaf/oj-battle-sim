export function selectAll(element: HTMLInputElement | HTMLTextAreaElement) {
	element.selectionEnd = element.value.length
}
