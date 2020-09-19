const condition = {
	conditionIndex: state => conditionId => {
		return state.conditions.findIndex(currentCondition => currentCondition.id === conditionId);
	},

	conditions(state) {
		return state.conditions
	},

	condition: (state, getters) => conditionId => {
		const conditionIndex = getters.conditionIndex(conditionId);
		return {...state.conditions[conditionIndex], ...{index: conditionIndex}}
	}
}

const criteria = {
	criteria: (state, getters) => conditionId => {
		return state.conditions[getters.conditionIndex(conditionId)].criteria
	},

	criterium: state => (conditionId, criteriaId) => {

	}
}

const pattern = {
	pattern: (state, getters) => conditionId => {
		return state.conditions[getters.conditionIndex(conditionId)].pattern
	}
}

const response = {
	responseSet: (state, getters) => conditionId => {
		return state.conditions[getters.conditionIndex(conditionId)].response
	},

	criteriaResponse: (state, getters) => (conditionId, criteriaId) => {

	}
}

export default {
	...condition,
	...criteria,
	...pattern,
	...response
}