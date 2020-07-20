import Vue from 'vue'

import criteria from '../condition/criteria';
import criteriaGroup from '../condition/criteria-group';

export const addCriteria = function (criteriaType) {
	const ComponentClass = Vue.extend(criteria)
	const instance = new ComponentClass({
		propsData: {
			criteriaType : typeof criteriaType === "string" ? criteriaType : undefined,
			criteriaLevel: this.criteriaLevel
		}
	})
	instance.$mount()
	this.$el.parentNode.insertBefore(instance.$el, this.$el.nextSibling);
}

export const addCriteriaGroup = function (isInnerGroup) {
	const ComponentClass = Vue.extend(criteriaGroup)
	const instance = new ComponentClass({
		propsData: {
			criteriaLevel: isInnerGroup ? this.criteriaLevel + 1 : this.criteriaLevel
		}
	})
	instance.$mount()
	this.$el.parentNode.insertBefore(instance.$el, this.$el.nextSibling);
}

export const deleteCriteria = function () {
	this.$destroy();
	this.$el.parentNode.removeChild(this.$el);
}