export class Color {
    header = 'red';
    param = 'blue'
    formBody = 'green'
}

export const defaultCriteriaConfig = {
	header: {
		color: 'red',
		shortText: 'h',
		next: 'param'
	},
	param: {
		color: 'blue',
		shortText: 'p',
		next: 'formBody'
	},
	formBody: {
		color: 'green',
		shortText: 'fb',
		next: 'header'
	}
}

export const conditionChecks = [
	{ value: '1', text: 'is_present' },
	{ value: '2', text: 'is_absent' },
	{ value: '3', text: '==' },
	{ value: '4', text: '!=' },
	{ value: '5', text: '>' },
	{ value: '6', text: '>=' },
	{ value: '7', text: '<' },
	{ value: '8', text: '<=' },
	{ value: '9', text: 'regex' },
	{ value: '10', text: 'is_file' },
	{ value: '11', text: 'is_not_file' },
	{ value: '12', text: 'in' },
	{ value: '13', text: 'not in' }
]

export function organisePattern(pattern){
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
