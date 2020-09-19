import { defaultCondition, defaultCriterium } from "~/mock/condition/condition";

const condition = {
	createCondition({commit}) {
		commit('createCondition', defaultCondition);
	},

	deleteCondition({commit, getters}, conditionId) {
		const index = getters.conditionIndex(conditionId);
		commit('deleteCondition', index);
	}
}

const criteria = {
	addDefaultCriterium({commit, getters}, { conditionId }) {
		const conditionIndex = getters.conditionIndex(conditionId);
		commit('pushCriterium', {conditionIndex, criterium: defaultCriterium});
		commit('addPattern', { conditionIndex, criteriumIndex: getters.conditions.length - 1 });
	},

	addCriterium({commit, getters, dispatch}, { conditionId, previoudCriteriaId, criterium }) {
		const conditionIndex = getters.conditionIndex(conditionId);
		commit('pushCriterium', {conditionIndex, criterium});
		dispatch('addCriteriaPattern');// TODO: to be corrected
	},

	updateCriterium({commit, getters}, {conditionId, criterium}) {
		const conditionIndex = getters.conditionIndex(conditionId);
		commit('updateCriterium', { conditionIndex, criterium });
	},

	deleteCriterium({commit, getters}, { conditionId, criteriumId }) {
		const conditionIndex = getters.conditionIndex(conditionId);
		commit('deleteCriterium', { conditionIndex, criteriumId });
		commit('deletePattern', { conditionIndex, criteriumId });
	}
}

const criteriaGroup = {
	addCriteriaGroup() {

	},

	deleteCriteriaGroup() {

	}
}

const pattern = {
	addCriteriaPattern({commit, getters}, { conditionIndex, previoudCriteriaId, criteriumIndex }) {
		commit('addPattern', { conditionIndex, previoudCriteriaId, criteriumIndex });// TODO: to be corrected
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