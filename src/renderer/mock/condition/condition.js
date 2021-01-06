export class Criterium {
	key;
	value;
	check;

	constructor(key, value, check) {
		this.key = key
		this.value = value
		this.check = check
	}
}

export class Condition {
	name;
	pattern;
	criteria;

	constructor(name, pattern, criteria) {
		this.name = name
		this.pattern = pattern
		this.criteria = criteria
	}
}

export const conditions = []

export function defaultCondition() {
	return {
		name: 'new condition',// i18n
		id: new Date().getTime(),
		criteria: [{
			"id": new Date().getTime(),
			"type": "header",
			"key": "",
			"check": "1",
			"value": ""
		}],
		pattern: new Date().getTime().toString()
	}
}

export const defaultCriterium = {
	isAND: true,
	criteria: {
		"type": "header",
		"key": "",
		"check": "1",
		"value": ""
	}
}

export const defaultCriteriaGroup = {
	isAND: true,
	criterium: {
		"type": "header",
		"key": "",
		"check": "1",
		"value": ""
	},
	pattern: "0"
}