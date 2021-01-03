import { defaultCondition, defaultCriterium, defaultCriteriaGroup } from "~/mock/condition/condition";
import { StringUtilities } from "~/utilities/string-utilities";
import { PatternUtilities } from "~/mock/condition/pattern-utilities";

const conditionSetAction = {
	initConditionSet({commit}){
		commit('addCondition', { conditionIndex: 0, condition: defaultCondition });
	}
}


const conditionAction = {
	createCondition({commit, getters}, previousConditionId){
		const conditionIndex = previousConditionId ? getters.conditionIndex(previousConditionId) : 
			getters.conditions.length;// next_index = conditions.length
		commit('addCondition', { conditionIndex, condition: defaultCondition });
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

const criteriaAction = {
	createCriterium({commit, getters, dispatch}, { conditionId, previoudCriteriaId }) {
		const conditionIndex = getters.conditionIndex(conditionId);
		commit('pushCriterium', {conditionIndex, criterium: defaultCriterium});
		dispatch('addCriteriaPattern', { conditionIndex, previoudCriteriaId, 
			criteriumId: defaultCriterium.criteria.id, isAND: defaultCriterium.isAND });
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
		commit('deleteCriteriumPattern', { conditionIndex, criteriumId });
	}
}

const criteriaGroupAction = {
	/**
	 * previoudCriteriaId - if criterium group, send the first criteriumId
	 */
	createCriteriaGroup({commit, getters, dispatch}, { conditionId, previoudCriteriaId }) {
		const conditionIndex = getters.conditionIndex(conditionId);
		commit('pushCriterium', { conditionIndex, criterium: defaultCriteriaGroup.criteria });
		dispatch('addCriteriaGroupPattern', { conditionIndex, previoudCriteriaId, 
			criteriumId: defaultCriteriaGroup.criteria.id, isAND: defaultCriteriaGroup.isAND });
	},
	
	/* addCriteriaGroup({commit, getters, dispatch}, { conditionId, previoudCriteriaId, criteriaGroup }) {
		const conditionIndex = getters.conditionIndex(conditionId);
		commit('pushCriterium', { conditionIndex, criterium: defaultCriteriaGroup.criteria });
		dispatch('addCriteriaGroupPattern', { conditionIndex, previoudCriteriaId, 
			criteriumId: defaultCriteriaGroup.criteria.id, isAND: defaultCriteriaGroup.isAND });
	}, */

	/**
	 * criteriumId - first criteriumId of the group
	 */
	deleteCriteriaGroup({commit, getters, dispatch}, { conditionId, criteriumId }) {
		const conditionIndex = getters.conditionIndex(conditionId);
		const criteria = getters.groupCriteriumList(conditionIndex, criteriumId);
		commit('deleteMultipleCriterium', { conditionIndex, criteria });
		dispatch('deleteCriteriumGroupPattern', { conditionIndex, criteriumId });
	}
}

const patternAction = {
	updateOperator({commit, getters}, { conditionIndex, criteriumId, isAND, isCriteriaGroup }) {
		let pattern = getters.conditionPattern(conditionIndex);
		const indexToChange = getters.operatorIndex(criteriumId, isCriteriaGroup);
		pattern = StringUtilities.replaceAt(indexToChange, isAND ? '&' : '|')
		commit('updatePattern', { conditionIndex, pattern });
	},
	
	addCriteriaPattern({commit, getters}, { conditionIndex, previousCriteriumId, criteriumId, isAND }) {
		const pattern = getters.conditionPattern(conditionIndex);
		const criteria = {
			isAND,
			value: criteriumId,
			type: 'criteria'
		};
		commit('updatePattern', { conditionIndex, 
			pattern: PatternUtilities.insertCriteria(pattern, previousCriteriumId, criteria) });
	},

	addCriteriaGroupPattern({commit, getters}, { conditionIndex, previousCriteriumId, criteriumId, isAND }) {
		const pattern = getters.conditionPattern(conditionIndex);
		const criteria = {
			isAND,
			value: criteriumId,
			type: 'criteriaGroup'
		};
		commit('updatePattern', { conditionIndex, 
			pattern: PatternUtilities.insertCriteria(pattern, previousCriteriumId, criteria) });
	},

	deleteCriteriumPattern({commit, getters}, { conditionIndex, criteriumId }) {
		const pattern = getters.conditionPattern(conditionIndex);
		commit('updatePattern', { conditionIndex, 
			pattern: PatternUtilities.deleteCriteria(pattern, criteriumId, false) });
	},
	
	deleteCriteriumGroupPattern({commit, getters}, { conditionIndex, criteriumId }) {
		const pattern = getters.conditionPattern(conditionIndex);
		commit('updatePattern', { conditionIndex, 
			pattern: PatternUtilities.deleteCriteria(pattern, criteriumId, true) });
	}
}

export default {
	...conditionSetAction,
	...conditionAction,
	...criteriaAction,
	...criteriaGroupAction,
	...patternAction,
}