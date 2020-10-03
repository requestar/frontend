// Remove this file
const conditionActions = {
	createCondition({commit}) {
		commit('createCondition', emptyCondition)
	},

	// Will be used in future for copy paste condition
	addCondition({commit}, { previousConditionId, condition }) {
		/* const conditionSet = state.conditions;
		const index = conditionSet.findIndex(currentCondition => currentCondition.id === previoudConditionId);
		conditionSet.splice( index, 0, condition); */
		state.conditions.push(condition) // Move to Mutation
	},

	deleteCondition(state, conditionId){
		const conditionSet = state.conditions;
		const index = conditionSet.findIndex(currentCondition => currentCondition.id === conditionId);
		state.conditions = [...conditionSet.slice(0, index), ...conditionSet.slice(index+1)]
	}
}

const criteriaActions = {
	addCriterium(state, { conditionId, criterium }) {
		const conditionSet = state.conditions;
		const index = conditionSet.findIndex(currentCondition => currentCondition.id === conditionId);
		conditionSet[index].criteria.push(criterium)
	},

	updateCriterium(state, {conditionId, criterium}) {
		const { id: criteriumId } = criterium
		const conditionSet = state.conditions;
		const conditionIndex = conditionSet.findIndex(currentCondition => currentCondition.id === conditionId);
		const criteria = state.conditions[conditionIndex];
		const criteriumIndex = criteria.findIndex(currentCriteria => currentCriteria.id === criteriumId);
		const oldCriterium = criteria[criteriumIndex];
		state.conditions[conditionIndex].criteria[criteriumIndex] = {... oldCriterium, ...criterium}
	},

	deleteCriterium(state, { conditionId, criteriumId }) {
		//TODO: handle pattern delete in this itself
	}
}

export const actions = {

}