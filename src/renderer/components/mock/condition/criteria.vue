<template>
  <v-card
    :key="currentCondition.type"
    class="d-flex flex-row"
    style="max-height:5em"
  >
    <v-col md="3" class="d-flex flex-row mb-6">
      <v-chip
        v-if="!isFirst"
        class="headline ma-2 mt-0"
        :color="currentCondition.color"
        outlined
        large
      >
        &&
      </v-chip>
      <v-chip
        class="headline ma-2 mt-0"
        :color="currentCondition.color"
        outlined
        large
        @click="convertCondition(currentCondition.type)"
      >
        {{ currentCondition.shortText.toUpperCase() }}
      </v-chip>
      <v-text-field
        label="Key"
        :color="currentCondition.color"
        outlined
      />
    </v-col>
    <v-col md="2">
      <v-select
        :items="conditionChecks"
        full-width
        label="Check"
        item-text="text"
        item-value="value"
        outlined
        :color="currentCondition.color"
      />
    </v-col>
    <v-col md="5">
      <v-text-field
        label="Value"
        :color="currentCondition.color"
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
              :color="currentCondition.color"
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
              :color="currentCondition.color"
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
                  @click="addCriteria('header')"
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
                  @click="addCriteria('param')"
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
                  @click="addCriteria('formBody')"
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
              :color="currentCondition.color"
              outlined
              v-on="on"
              @click="addCriteriaGroup"
            >
              <i class="fa fa-object-group" aria-hidden="true" />
            </v-chip>
          </template>
          <span>Add Condition Group</span>
        </v-tooltip>

        <responseEditor :current-condition="currentCondition" />
      </v-row>
    </v-col>
  </v-card>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import criteria from '../condition/criteria';
import criteriaGroup from '../condition/criteria-group';

import { Condition, conditionChecks } from '../../../mock/condition/check'

export default {
	vuetify: new Vuetify(),
	components: {
		responseEditor: () => import('../response/editor')
	},
	props: {
		criteriaType: {
			type: String,
			default: 'param',
			required: true,
		},
		isFirst: {
			type: Boolean,
			default: false,
		},
		criteriaLevel: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			conditionChecks,
			currentCondition: Condition[this.criteriaType],
			conditions: Condition,
		}
	},
	methods: {
		convertCondition(criteriaType) {
			this.currentCondition = Condition[Condition[criteriaType].next]
		},
		
		addCriteria(criteriaType){
			const ComponentClass = Vue.extend(criteria)
			const instance = new ComponentClass({
				propsData: {
					criteriaType,
					criteriaLevel : this.criteriaLevel
				}
			})
			instance.$mount()
			this.$el.parentNode.insertBefore(instance.$el, this.$el.nextSibling);
		},

		deleteCriteria(){
			this.$destroy();
			this.$el.parentNode.removeChild(this.$el);
		},

		addCriteriaGroup(){
			const ComponentClass = Vue.extend(criteriaGroup)
			console.log(this.criteriaLevel)
			const instance = new ComponentClass({
				propsData: {
					criteriaLevel : this.criteriaLevel + 1
				}
			})
			instance.$mount()
			this.$el.parentNode.insertBefore(instance.$el, this.$el.nextSibling);
		},

		openResponseEditor(){
			
		}
	},
}
</script>
