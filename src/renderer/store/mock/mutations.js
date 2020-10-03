import { ArrayUtils } from "~/utilities/array-utilities";

const condition = {
	addCondition(state, { conditionIndex, condition }){
		state.conditions = ArrayUtils.insertValue(state.conditions, conditionIndex, condition);
	},

	updateCondition(state, { conditionIndex, condition } ){
		state.conditions[conditionIndex] = { ...state.conditions[conditionIndex], ...condition };
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
		const criteria = state.conditions[conditionIndex];
		const criteriumIndex = criteria.findIndex(currentCriteria => currentCriteria.id === criteriumId);
		const oldCriterium = criteria[criteriumIndex];
		state.conditions[conditionIndex].criteria[criteriumIndex] = {... oldCriterium, ...criterium}
	}
}

const criteriaGroup = {
	pushCriteria(state, { conditionIndex, criteriaGroup }){

	},


}

const pattern = {
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