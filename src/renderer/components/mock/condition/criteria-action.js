import Vue from 'vue'

import criteria from '../condition/criteria';
import criteriaGroup from '../condition/criteria-group';

export const addCriteria = function (conditionId, criteriaType, criteriaLevel) {
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
}

export const addCriteriaGroup = function (conditionId, isInnerGroup) {
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
}

export const deleteCriteria = function () {
	this.$destroy();
	this.$el.parentNode.removeChild(this.$el);
}