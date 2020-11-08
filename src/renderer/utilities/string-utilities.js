export class StringUtilities {
	static replaceAt(index, replacement) {
		return this.substr(0, index) + replacement + this.substr(index + replacement.length);
	}
}