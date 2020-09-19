const condition = {
	createCondition(state, condition) {
		state.conditions.push(condition)
	},

	deleteCondition(state, index){
		state.conditions = [...state.conditions.slice(0, index), ...state.conditions.slice(index+1)]
	}
}

const criteria = {
	createDefaultCriterium(state, { conditionIndex, criterium }) {
		state.conditions[conditionIndex].criteria.push(criterium)
	}
}

const pattern = {
	addPattern(state, { conditionIndex, criteriumIndex }) {
		state.conditions[conditionIndex].pattern = criteriumIndex.toString()
	}
}

export default {
	...condition,
	...criteria,
	...pattern
}