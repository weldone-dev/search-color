import {countCol} from "../env";

function validateHexColor(colorHex: string | undefined): boolean {
		if (!colorHex) return false
		const hex = removeHash(colorHex)
		const hexInt = parseInt(hex, 16)
		if (isNaN(hexInt)) return false
		return (hex.length === 3 && !!(hexInt >> 8)) || (hex.length === 6 && !!(hexInt >> 20))
}

function convertHexInRGB(colorHex: string): number[] {
		if (!colorHex || !validateHexColor(colorHex)) return [0, 0, 0]
		const hex = removeHash(colorHex)
		const hexArray = []
		for (let i = 0; i < 3; i += 1) {
				const chunk = hex.length === 3
					? hex[i] + hex[i]
					: hex[i * 2] + hex[i + 1]
				hexArray.push(parseInt(chunk, 16))
		}
		return hexArray
}

const luminance_x = (x: number): number => {
		x /= 255;
		return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
const rgb2luminance = (...args: number[]): number => {
		const derived = [0.2126, 0.7152, 0.0722] //r, g, b
		return derived.reduce((total, currentValue, currentIndex) => total + currentValue * luminance_x(args[currentIndex]), 0)
}

const generateRandomColor = (): string => {
		const hex = (Math.random() * (1 << 24) >> 0).toString(16)
		return validateHexColor(hex) ? hex : generateRandomColor()
}

const luminance = (colorHex: string) => rgb2luminance(...convertHexInRGB(colorHex))
const isInCorrectnessCheck = (colors: string) => {
		const arrayColors = parseColor(colors)
		return arrayColors.length !== countCol || arrayColors.map((color) => validateHexColor(color)).includes(false)
}
const checkAndRestoreColor = (colors: string) => {
		const result = []
		const arrayColors = parseColor(colors)
		for (let i = 0; i < countCol; i++) {
				const color = validateHexColor(arrayColors?.[i]) ? arrayColors[i] : generateRandomColor()
				result.push(color)
		}
		return result
}
const addHash = (value: string) => "#" + value
const removeHash = (value: string): string => value.match("[^#].*")?.[0] as string
const parseColor = (value: string): string[] => value.split("-")
const parseColorFromParam = (hash: string): string[] => checkAndRestoreColor(hash)
const generatePathnameFromColors = (values: string[]): string => values.map((color) => removeHash(color)).join("-")
const generateColorForURL = (colors: string[]): string => "/" + generatePathnameFromColors(colors)

export {
		addHash,
		checkAndRestoreColor,
		isInCorrectnessCheck,
		generateRandomColor,
		luminance,
		parseColorFromParam,
		generateColorForURL
}