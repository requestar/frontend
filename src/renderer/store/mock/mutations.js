import { ArrayUtils } from "~/utilities/array-utilities";

const condition = {
	createCondition(state, condition) {
		state.conditions.push(condition)
	},

	deleteCondition(state, index){
		state.conditions = ArrayUtils.removeIndex(state.conditions, index);
		// state.conditions = [...state.conditions.slice(0, index), ...state.conditions.slice(index+1)]
	}
}

const criteria = {
	pushCriterium(state, { conditionIndex, criterium }) {
		state.conditions[conditionIndex].criteria.push(criterium)
	},

	updateCriterium(state, { conditionIndex, criterium }){
		const { id: criteriumId } = criterium
		const criteria = state.conditions[conditionIndex];
		const criteriumIndex = criteria.findIndex(currentCriteria => currentCriteria.id === criteriumId);
		const oldCriterium = criteria[criteriumIndex];
		state.conditions[conditionIndex].criteria[criteriumIndex] = {... oldCriterium, ...criterium}
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