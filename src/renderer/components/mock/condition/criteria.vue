<template>
  <v-card
    :key="currentCriteria.type"
    class="d-flex flex-row"
    style="max-height:5em; border: black solid 1px;"
    shaped
  >
    <v-col md="3" class="d-flex flex-row mb-6">
      <v-chip
        v-if="!isFirst"
        class="headline ma-2 mt-0"
        :color="currentCriteria.color"
        outlined
        large
        @click="isAnd = !isAnd"
      >
        {{ isAnd ? '&&' : '||' }}
      </v-chip>
      <v-chip
        class="headline ma-2 mt-0"
        :color="currentCriteria.color"
        outlined
        large
        @click="convertCondition(currentCriteria.type)"
      >
        {{ currentCriteria.shortText.toUpperCase() }}
      </v-chip>
      <v-text-field
        v-model="currentCriteria.key"
        label="Key"
        :color="currentCriteria.color"
        outlined
      />
    </v-col>
    <v-col md="2">
      <v-select
        v-model="currentCriteria.check"
        :items="conditionChecks"
        full-width
        label="Check"
        item-text="text"
        item-value="value"
        outlined
        :color="currentCriteria.color"
      />
    </v-col>
    <v-col md="5">
      <v-text-field
        v-model="currentCriteria.value"
        label="Value"
        :color="currentCriteria.color"
        outlined
      />
    </v-col>
    <v-col md="2" class="d-flex flex-row">
      <v-row
        align="center"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              v-if="!isFirst"
              class="mr-2"
              v-bind="attrs"
              :color="currentCriteria.color"
              outlined
              v-on="on"
              @click="deleteCriteria"
            >
              <v-icon size="medium">mdi-minus</v-icon>
            </v-chip>
          </template>
          <span>Delete Condition</span>
        </v-tooltip>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              class="mr-2"
              v-bind="attrs"
              :color="currentCriteria.color"
              outlined
              v-on="on"
            >
              <v-icon size="medium">mdi-plus</v-icon>
            </v-chip>
          </template>
          <v-list>
            <v-list-item>
              <v-hover v-slot:default="{ hover }" open-delay="200">
                <v-btn
                  elevation="2"
                  color="red"
                  :dark="hover ? true : false"
                  :outlined="hover ? false : true"
                  raised
                  class="mr-10"
                  @click="addCriteria(conditionId, 'header', criteriaLevel)"
                >
                  <v-icon size="large">mdi-plus</v-icon>
                  Header(H)
                </v-btn>
              </v-hover>
            </v-list-item>
            <v-list-item>
              <v-hover v-slot:default="{ hover }" open-delay="200">
                <v-btn
                  elevation="2"
                  color="blue"
                  :dark="hover ? true : false"
                  :outlined="hover ? false : true"
                  raised
                  class="mr-10"
                  @click="addCriteria(conditionId, 'param', criteriaLevel)"
                >
                  <v-icon size="large">mdi-plus</v-icon>
                  Param(P)
                </v-btn>
              </v-hover>
            </v-list-item>
            <v-list-item>
              <v-hover v-slot:default="{ hover }" open-delay="200">
                <v-btn
                  elevation="2"
                  color="green"
                  :dark="hover ? true : false"
                  :outlined="hover ? false : true"
                  raised
                  @click="addCriteria(conditionId, 'formBody', criteriaLevel)"
                >
                  <v-icon size="large">mdi-plus</v-icon>
                  Form Body(FB)
                </v-btn>
              </v-hover>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-tooltip bottom>
          <template v-if="criteriaLevel < 3" v-slot:activator="{ on, attrs }">
            <v-chip
              class="mr-2"
              v-bind="attrs"
              :color="currentCriteria.color"
              outlined
              v-on="on"
              @click="addCriteriaGroup"
            >
              <i class="fa fa-object-group" aria-hidden="true" />
            </v-chip>
          </template>
          <span>Add Condition Group</span>
        </v-tooltip>

        <responseEditor :response="response" :color="currentCriteria.color" @printResponse="printResponse(currentCriteria.response)" />
      </v-row>
    </v-col>
  </v-card>
</template>

<script>
import Vuetify from 'vuetify'
import Vue from 'vue'
import { mapMutations } from "vuex";

import { defaultCriteriaConfig, conditionChecks } from '../../../mock/condition/check'
import {addCriteria, deleteCriteria, addCriteriaGroup} from "./criteria-action"
Vue.config.devtools = true;

export default {
	vuetify: new Vuetify(),
	components: {
		responseEditor: () => import('../response/editor')
	},
	props: {
		conditionId: {
			type: Number,
			required: true
		},
		criterium: {
			type: Object,
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
	data() {
		return {
			conditionChecks,
			currentCriteria: {... this.criterium, ...defaultCriteriaConfig[this.criterium.type]}
		}
	},
	computed: {
		response (){
			const conditions = this.$store.state.mock.conditions
			const index = conditions.findIndex(condition => this.conditionId === condition.id)
			const response = conditions[index].response
			return response && response[this.criterium.id]
		}
	},
	methods: {
		convertCondition() {
			const nextCriteriaType = this.currentCriteria.next
			this.currentCriteria = {...this.currentCriteria, 
				...defaultCriteriaConfig[nextCriteriaType], 
				...{'type': nextCriteriaType}
			}
		},
    
		addCriteria, deleteCriteria, addCriteriaGroup,
    
		printResponse(e){
			console.log(this.currentCriteria.response);
		},
    
		saveThis(){
			this.$emit('saveThis', this.currentCriteria)
		},
		...mapMutations({
			toggle: 'mock/add'
		})
	},
}
</script>
