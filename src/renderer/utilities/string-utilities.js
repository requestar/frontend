export class StringUtilities {
	static replaceAt(originalString, index, replacement) {
		return originalString.substr(0, index) + replacement + originalString.substr(index + replacement.length);
	}
}