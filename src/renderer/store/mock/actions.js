import { defaultCondition, defaultCriterium } from "~/mock/condition/condition";


const conditionSet = {
	initConditionSet({commit}){
		commit('addCondition', { conditionIndex: 0, condition: defaultCondition });
	}
}


const condition = {
	createCondition({commit, getters}, { previoudConditionId }){
		const conditionIndex = previoudConditionId ? getters.conditionIndex(previoudConditionId) : 
			getters.conditions.length - 1 ;
		commit('addCondition', { conditionIndex, defaultCondition });
	},

	addCondition({commit, getters}, { previoudConditionId, condition }){
		const conditionIndex = getters.conditionIndex(previoudConditionId);
		commit('addCondition', { conditionIndex, condition });
	},

	updateCondition({commit, getters}, {conditionId, condition}) {
		const conditionIndex = getters.conditionIndex(conditionId);
		commit('updateCondition', { conditionIndex, condition });
	},

	deleteCondition({commit, getters}, { conditionId }){
		const conditionIndex = getters.conditionIndex(conditionId);
		commit('deleteCondition', conditionIndex);
	}
}

const criteria = {
	createCriterium({commit, getters, dispatch}, { conditionId, previoudCriteriaId }) {
		const conditionIndex = getters.conditionIndex(conditionId);
		commit('pushCriterium', {conditionIndex, criterium: defaultCriterium});
		dispatch('addCriteriaPattern', { conditionIndex, previoudCriteriaId, criteriumId: defaultCriterium.criteria.id, isAND: defaultCriterium.isAND });
	},

	addCriterium({commit, getters, dispatch}, { conditionId, previoudCriteriaId, criterium }) {
		const conditionIndex = getters.conditionIndex(conditionId);
		commit('pushCriterium', {conditionIndex, criterium});
		dispatch('addCriteriaPattern', { conditionIndex, previoudCriteriaId, criteriumId: criterium.id });
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
	createCriteriaGroup({commit, getters, dispatch}, { conditionId, previoudCriteriaId }) {

	},
	
	addCriteriaGroup({commit, getters, dispatch}, { conditionId, previoudCriteriaId, criterium }) {

	},

	deleteCriteriaGroup() {

	}
}

const pattern = {
	addCriteriaPattern({commit, getters}, { conditionIndex, previoudCriteriaId, criteriumId, isAND }) {
		commit('addPattern', { conditionIndex, previoudCriteriaId, criteriumIndex });// TODO: to be corrected
	},

	addCriteriaGroupPattern(){

	},

	updateOperator({commit, getters}, { conditionIndex, criteriumId, isAND, isCriteriaGroup }) {

	},

	deleteCriteriumPattern(){

	},
	
	deleteCriteriumGroupPattern(){

	}
	/* addPatternCriteria(state, {conditionId, 
			previousCriteriumIndex: previousCriteria, criteriumIndex : criterium, operator}){
			const conditionSet = state.conditions;
			const condition = conditionSet.filter(currentCondition => currentCondition.id === conditionId);
			const pattern = condition.pattern;
			const postition = pattern.indexOf(previousCriteria);
			pattern.splice(postition, 0, 'operator'+criterium);
			condition.pattern = pattern;
		}, */
}

export default {
	...conditionSet,
	...condition,
	...criteria,
	...criteriaGroup,
	...pattern,
}