import { ArrayUtils } from "~/utilities/array-utilities";

const condition = {
	addCondition(state, { conditionIndex, condition }){
		state.conditions = ArrayUtils.insertValue(state.conditions, condition, conditionIndex);
		console.log(state.conditions)
	},

	updateCondition(state, { conditionIndex, condition } ){
		state.conditions[conditionIndex] = { ...state.conditions[conditionIndex], ...condition };
	},

	updateConditionUpdatedTime(state, { conditionIndex } ){
		state.conditions[conditionIndex].updatedTime = new Date().getTime();
	},

	deleteCondition(state, index){
		state.conditions = ArrayUtils.removeIndex(state.conditions, index);
	}
}

const criteria = {
	pushCriterium(state, { conditionIndex, criterium }) {
		state.conditions[conditionIndex].criteria.push(criterium)
	},

	updateCriterium(state, { conditionIndex, criterium }){
		const { id: criteriumId } = criterium
		const criteria = state.conditions[conditionIndex].criteria;
		const criteriumIndex = criteria.findIndex(currentCriteria => currentCriteria.id === criteriumId);
		const oldCriterium = criteria[criteriumIndex];
		state.conditions[conditionIndex].criteria[criteriumIndex] = {... oldCriterium, ...criterium}
	},

	deleteCriterium(state, { conditionIndex, criteriumId }){
		const criteria = state.conditions[conditionIndex].criteria
		const criteriumIndex = criteria.findIndex(currentCriteria => currentCriteria.id === criteriumId)
		state.conditions[conditionIndex].criteria = ArrayUtils.removeIndex(criteria, criteriumIndex)
	}
}

const criteriaGroup = {
	pushCriteria(state, { conditionIndex, criteriaGroup }){

	},


}

const pattern = {
	updatePattern(state, { conditionIndex, pattern}) {
		state.conditions[conditionIndex].pattern = pattern
	},

	addCriteria(){

	},

	deleteCriteria(){

	},

	updateCriteriaOperator(){

	},

	addCriteriaGroup(){

	},

	deleteCriteriaGroup(){
		
	},

	updateCriteriaGroupOperator(){

	}
}

export default {
	...condition,
	...criteria,
	...criteriaGroup,
	...pattern,
}