/* const pattern = "1212&(12|212&(112&32)|(1212|32))|121";
const newCriteriumId = 1212;
const previousCriteriumId = 32;
const isAND = false; */ 

export class PattetnUtilities {
	static breakPattern(pattern) {
		const array = [];
		const patternRegex = /(\d+|\s*[&|]\s*\d+|\s*[&|]\s*\(\s*\d+|\))\s*/g;
		let bracketCount = 0;
		let currentString = '';
	
		pattern.match(patternRegex).forEach(function (currentToken) {
			currentString += currentToken;
			let type = 'criteria';
			if (currentToken.includes('(')) {
				bracketCount++;
				return;
			}
			else if (currentToken.includes(')')) {
				bracketCount--;
				type = 'criteriaGroup';
			}
			if (bracketCount === 0) {
				array.push(createCriteria(type, currentString));
				currentString = '';
			}
		});
		return array;
	
		function createCriteria(type, currentPattern) {
			const firstChar = currentPattern.charAt(0);
			const isFirstCharOperator = firstChar === '&' || firstChar === '|';
			currentPattern = isFirstCharOperator ? currentPattern.slice(1) : currentPattern;
			return {
				type,
				value: currentPattern,
				isAnd: firstChar === '&',
				isFirst: !isFirstCharOperator
			}
		}
	}
	
	static collectPattern(brokenPattern) {
		return brokenPattern.reduce((collectedPatternString, currentPattern, i) => {
			return (i === 1 ? collectedPatternString.value : collectedPatternString) + 
				(currentPattern.isAnd ? "&" : "|") + currentPattern.value;
		});
	}
	
	
	static insertCriteria(pattern, previousCriteriumId, newCriteriumId, isAND) {
		const brokenPattern = this.breakPattern(pattern);
		let i = 0;
		while (i < brokenPattern.length) {
			const currentCriteria = brokenPattern[i];
			if (currentCriteria.value.includes(previousCriteriumId)) {
				if (currentCriteria.type === 'criteria') {
					currentCriteria.value = currentCriteria.value + (isAND ? "&" : "|") + newCriteriumId;
				}
				else {
					currentCriteria.value = this.insertCriteria(currentCriteria.value, previousCriteriumId, 
						newCriteriumId, isAND);
				}
				break;
			}
			i++;
		}
		return this.collectPattern(brokenPattern);
	}
}