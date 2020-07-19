export class Criterium {
    key;
    value;
    check;

    constructor (key, value, check) {
    	this.key = key
    	this.value = value
    	this.check = check
    }
}

export class Condition {
    name;
    pattern;
    criteria;

    constructor (name, pattern, criteria) {
    	this.name = name
    	this.pattern = pattern
    	this.criteria = criteria
    }
}

export const conditions = []