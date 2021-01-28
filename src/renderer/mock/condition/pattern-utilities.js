/* const pattern = "1212&(12|212&(112&32)|(1212|32))|121";
const newCriteriumId = 1212;
const previousCriteriumId = 32;
const isAND = false; */
const pattern = "1212&(12|212&(111)&(112&32)|(1212|32))|121";
export class PatternUtilities {
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
			currentPattern.value = currentPattern.type === 'criteriaGroup' && !currentPattern.value.startsWith("(") ? 
				'(' + currentPattern.value + ')' : currentPattern.value;
			return (i === 1 ? collectedPatternString.value : collectedPatternString) + 
				(currentPattern.isAnd ? "&" : "|") + currentPattern.value;
		});
	}
	
	
	static insertCriteria(pattern, previousCriteriumId, criteria) {
		const brokenPattern = this.breakPattern(pattern);
		let i = 0;
		while (i < brokenPattern.length) {
			const currentCriteria = brokenPattern[i];
			if(currentCriteria.type === 'criteria' && currentCriteria.value === previousCriteriumId.toString()){
				const newCriteriaValue = (criteria.isAnd ? "&" : "|") + 
						(criteria.type === 'criteriaGroup' ? "(" + criteria.value + ")" : criteria.value);
				currentCriteria.value = currentCriteria.value +  newCriteriaValue;
				break;
			}
			else if (currentCriteria.type === 'criteriaGroup' && currentCriteria.value.includes(previousCriteriumId)){
				currentCriteria.value = this.insertCriteria(currentCriteria.value, previousCriteriumId, criteria);
				break;
			}
			i++;
		}
		return this.collectPattern(brokenPattern);
	}

	static deleteCriteria(pattern, criteriaId, isCriteriaGroup){
		const regexString = new RegExp( 
			isCriteriaGroup ? '[&|]\\(' + criteriaId + '.*\\)' : '[&|]' + criteriaId + '(\\W)');
		const replaceString = isCriteriaGroup ? "" : "$1";
		return pattern.replace(regexString, replaceString);
	}
}

// console.log(PatternUtilities.insertCriteria(pattern, '212', {type: 'criteriaGroup', value: '111', isAnd: true}));
// console.log(pattern);
// console.log(PatternUtilities.deleteCriteria(pattern, '111', true));