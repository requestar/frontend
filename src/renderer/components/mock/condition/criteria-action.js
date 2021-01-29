import { defaultCriterium } from "../../../mock/condition/condition";
import { defaultCriteriaConfig } from "../../../mock/condition/check";

export const addCriteria = function (_store, conditionId, criteriaType, previousCriteriumId) {
	const criterium = defaultCriterium(criteriaType)
	_store.dispatch('mock/addCriterium', { conditionId, previousCriteriumId, criterium })
}

export const deleteCriteria = function (_store, conditionId, criteriumId) {
	_store.dispatch('mock/deleteCriterium', { conditionId, criteriumId })
}

export const addCriteriaGroup = function (_store, conditionId, previousCriteriumId) {
	_store.dispatch('mock/createCriteriaGroup', { conditionId, previousCriteriumId })
}

export const changeCriteriaOperator = function (_store, conditionId, criteriumId, isChangeToAndOperator) {
	_store.dispatch('mock/updateOperator', { conditionId, criteriumId, 
		isAND: isChangeToAndOperator, isCriteriaGroup: false })
}

export const changeCriteriaGroupOperator = function (_store, conditionId, firstCriteriumId, isChangeToAndOperator) {
	_store.dispatch('mock/updateOperator', { conditionId, criteriumId: firstCriteriumId, 
		isAND: isChangeToAndOperator, isCriteriaGroup: false })
}

export const changeCriteriaType = function (_store, conditionId, criteriumId, currentCriteriaType) {
	const nextCriteriaType = defaultCriteriaConfig[currentCriteriaType].next
}

/* export const addCriteria = function (conditionId, criteriaType, criteriaLevel) {
	const criterium = defaultCriterium()
	
	const criterium = {
		id: new Date().getTime(),
		type: criteriaType
	};
	const ComponentClass = Vue.extend(criteria)
	const instance = new ComponentClass({
		store: this.$store,
		propsData: {
			conditionId,
			criterium,
			isAnd: true,
			isFirst: false,
			criteriaLevel
		}
	})
	instance.$mount()
	this.$el.parentNode.insertBefore(instance.$el, this.$el.nextSibling);
} */

/* export const addCriteriaGroup = function (conditionId, isInnerGroup) {
	const ComponentClass = Vue.extend(criteriaGroup)
	const instance = new ComponentClass({
		propsData: {
			store: this.$store,
			propsData: {
				conditionId,
				isAnd: true,
				isFirst: false,
				criteriaLevel: isInnerGroup ? this.criteriaLevel + 1 : this.criteriaLevel
			}
		}
	})
	instance.$mount()
	this.$el.parentNode.insertBefore(instance.$el, this.$el.nextSibling);
} */

/* export const deleteCriteria = function () {
	this.$destroy();
	this.$el.parentNode.removeChild(this.$el);
} */