<template>
  <v-container fluid class="d-flex flex-row">
    <v-chip
      class="headline ma-2 mt-0"
      color="blue"
      outlined
      large
      @click="isAND = !isAND"
    >
      {{ isAND ? '&&' : '||' }}
    </v-chip>

    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card
          class="px-3 py-3"
          style="width:100%;"
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

import { addCriteria, deleteCriteria, addCriteriaGroup, convertOperator } from "./criteria-action"

export default {
	vuetify: new Vuetify(),
	props: {
		criteriaLevel: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			isAND: true
		}
	},
	created(){
		this.addCriteria = addCriteria.bind(this)
		this.deleteCriteria = deleteCriteria.bind(this)
		this.addCriteriaGroup = addCriteriaGroup.bind(this)
	},
	mounted(){
		const ComponentClass = Vue.extend(criteria)
		const instance = new ComponentClass({
			propsData: {
				criteriaType : 'param',
				isFirst: true,
				criteriaLevel: this.criteriaLevel,
			}
		})
		instance.$mount()
		this.$refs.criteria.appendChild(instance.$el)
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