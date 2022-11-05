export *  from "./color"

export function copyToClickBoard(text: string) {
		return navigator.clipboard.writeText(text)
}
