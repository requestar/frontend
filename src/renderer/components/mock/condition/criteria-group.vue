<template>
  <v-container fluid class="d-flex flex-row">
    <v-chip
      v-if="!isFirst"
      class="headline ma-2 mt-0"
      color="blue"
      outlined
      large
      @click="isAnd = !isAnd"
    >
      {{ isAnd ? '&&' : '||' }}
    </v-chip>

    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card
          class="px-3 py-3"
          style="width:100%; border: black solid 1px;"
          shaped
        >
          <v-layout
            v-if="hover"
            class="fab-container"
            absolute
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  dark
                  class="mr-2"
                  v-bind="attrs"
                  color="blue"
                  v-on="on"
                  @click="deleteCriteria"
                >
                  <v-icon size="medium">mdi-minus</v-icon>
                </v-chip>
              </template>
              <span>Delete Criteria Group</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  dark
                  class="mr-2"
                  v-bind="attrs"
                  color="blue"
                  v-on="on"
                  @click="addCriteria"
                >
                  <v-icon size="medium">mdi-plus</v-icon>
                </v-chip>
              </template>
              <span>Add Criteria</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  dark
                  class="mr-2"
                  v-bind="attrs"
                  color="blue"
                  v-on="on"
                  @click="addCriteriaGroup(false)"
                >
                  <i class="fa fa-object-group" aria-hidden="true" />
                </v-chip>
              </template>
              <span>Add Criteria Group</span>
            </v-tooltip>
          </v-layout>
          <div ref="criteria" />
        </v-card>
      </template>
    </v-hover>
  </v-container>
</template>
<script>
import Vue from 'vue'
import Vuetify from 'vuetify'

import criteria from '../condition/criteria';
import criteriaGroup from '../condition/criteria-group';

import { organisePattern } from '../../../mock/condition/check'
import { addCriteria, deleteCriteria, addCriteriaGroup } from "./criteria-action"

export default {
	vuetify: new Vuetify(),
	props: {
		conditionId: {
			type: Number,
			required: true
		},
		criteria: {
			type: Array,
			required: true,
		},
		pattern: {
			type: String,
			required: true,
		},
		isAnd: {
			type: Boolean,
			required: true,
		},
		isFirst: {
			type: Boolean,
			required: true,
		},
		criteriaLevel: {
			type: Number,
			required: true
		}
	},
	created(){
		this.addCriteria = addCriteria.bind(this)
		this.deleteCriteria = deleteCriteria.bind(this)
		this.addCriteriaGroup = addCriteriaGroup.bind(this)
	},
	mounted(){
		const patternArray = organisePattern(this.pattern);
		console.log(patternArray)
		patternArray.forEach(pattern => {
			if(pattern.type === "criteria"){
				const ComponentClass = Vue.extend(criteria)
				const criterium = this.$store.getters['mock/criteriumByPattern']({
					conditionId: this.conditionId,
					criteriumId: +pattern.value
				})
				const instance = new ComponentClass({
					store: this.$store,
					propsData: {
						conditionId: this.conditionId,
						criterium,
						isAnd: pattern.isAnd,
						isFirst: pattern.isFirst,
						criteriaLevel: this.criteriaLevel
					}
				})
				instance.$mount()
				this.$refs.criteria.appendChild(instance.$el)
			}
			else{
				const ComponentClass = Vue.extend(criteriaGroup)
				const instance = new ComponentClass({
					store: this.$store,
					propsData: {
						conditionId: this.conditionId,
						criteria: this.criteria,
						pattern: pattern.value,
						isAnd: pattern.isAnd,
						isFirst: pattern.isFirst,
						criteriaLevel: this.criteriaLevel + 1
					}
				})
				instance.$mount()
				this.$refs.criteria.appendChild(instance.$el)
			}
		})
		/* const ComponentClass = Vue.extend(criteria)
		const instance = new ComponentClass({
			propsData: {
				criteriaType : 'param',
				isFirst: true,
				criteriaLevel: this.criteriaLevel,
			}
		})
		instance.$mount()
		this.$refs.criteria.appendChild(instance.$el) */
	},
	methods: {
		// addCriteria, deleteCriteria, addCriteriaGroup, convertOperator - this is not working
	}
}
</script>
<style scoped>
.fab-container {
  position: absolute;
  top: -20px;
  right: 20px;
}
</style>