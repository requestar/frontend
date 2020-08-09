import { emptyCondition } from "~/mock/condition/condition";

export const state = () => ({
	conditions: [{
		name: 'new condition',// i18n
		id: new Date().getTime(),
		criteria: [
			{
				"id": new Date().getTime() + 1,
				"type": "header",
				"key": "key",
				"check": "check",
				"value": "value"
			}, {
				"id": new Date().getTime() + 2,
				"type": "header",
				"key": "key",
				"check": "check",
				"value": "value"
			},
			{
				"id": new Date().getTime() + 3,
				"type": "header",
				"key": "key",
				"check": "check",
				"value": "value"
			},
			{
				"id": new Date().getTime() + 4,
				"type": "header",
				"key": "key",
				"check": "check",
				"value": "value"
			},
			{
				"id": new Date().getTime() + 5,
				"type": "header",
				"key": "key",
				"check": "check",
				"value": "value"
			}
		],
		pattern: "1&2&(3|4)|5",
		response: {
			[new Date().getTime() + 1] : {
				status: '200',
				value: ""
			},
			[new Date().getTime() + 2] : {
				status: '201',
				value: "elan"
			},
			[new Date().getTime() + 3] : {
				status: '200',
				value: ""
			},
			[new Date().getTime() + 4] : {
				status: '201',
				value: "elan"
			},
			[new Date().getTime() + 5] : {
				status: '200',
				value: ""
			}
		}
	}]
})

export const mutations = {
	createCondition(state) {
		state.conditions.push(emptyCondition)
	},
	addCondition(state, { previoudConditionId, condition }) {
		/* const conditionSet = state.conditions;
		const index = conditionSet.findIndex(currentCondition => currentCondition.id === previoudConditionId);
		conditionSet.splice( index, 0, condition); */
		state.conditions.push(condition)
	},

	addCriterium(state, { conditionId, criterium }) {
		const conditionSet = state.conditions;
		const index = conditionSet.findIndex(currentCondition => currentCondition.id === conditionId);
		conditionSet[index].criteria.push(criterium)
	},

	updateCriterium(state, { conditionId, previousCriteriumId,
		criterium: { id: criteriumId, type, key, check, value }, operator }) {

	},

	deleteCriterium(state, { conditionId, criteriumId }) {
		//TODO: handle pattern delete in this itself
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

	addCriteriaGroup() {

	},

	deleteCriteriaGroup() {

	},

	updateOperator() {

	}
}

export const actions = {

}