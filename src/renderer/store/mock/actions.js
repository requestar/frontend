import { defaultCondition, defaultCriterium } from "~/mock/condition/condition";

const condition = {
	createCondition({commit}) {
		commit('createCondition', defaultCondition)
	},

	deleteCondition({commit, getters}, conditionId) {
		const index = getters.conditionIndex(conditionId)
		commit('deleteCondition', index)
	}
}

const criteria = {
	addDefaultCriterium({commit, getters}, { conditionId }) {
		const conditionIndex = getters.conditionIndex(conditionId)
		commit('createDefaultCriterium', {conditionIndex, criterium: defaultCriterium})
		commit('addPattern', { conditionIndex, criteriumIndex: getters.conditions.length - 1 })
	},

	addCriterium(state, { conditionId, previoudCriteriaId, criterium }) {
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
		
	}
}

const criteriaGroup = {
	addCriteriaGroup() {

	},

	deleteCriteriaGroup() {

	}
}

const pattern = {
	addCriteriaPattern(){

	},

	addCriteriaGroupPattern(){

	},

	
	/* addPatternCriteria(state, {conditionId, 
			previousCriteriumIndex: previousCriteria, criteriumIndex : criterium, operator}){
			const conditionSet = state.conditions;
			const condition = conditionSet.filter(currentCondition => currentCondition.id === conditionId);
			const pattern = condition.pattern;
			const postition = pattern.indexOf(previousCriteria);
			pattern.splice(postition, 0, 'operator'+criterium);
			condition.pattern = pattern;
		}, */
	updateOperator() {

	}
}

export default {
	...condition,
	...criteria,
	...criteriaGroup,
	...pattern
}