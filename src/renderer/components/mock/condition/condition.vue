<template>
  <v-container fluid>
    <v-card class="mx-auto" shaped>
      <v-toolbar dense dark>
        <v-card-title class="headline">
          {{ condition.name }}
          <!-- <v-text-field /> -->
        </v-card-title>
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-hover v-slot:default="{ hover }" open-delay="200">
              <v-btn
                elevation="2"
                color="blue"
                :dark="hover ? true : false"
                :outlined="hover ? false : true"
                raised
                v-bind="attrs"
                v-on="on"
                @click="deleteCondition(condition.id)"
              >
                <v-icon size="large">mdi-delete</v-icon>
              </v-btn>
            </v-hover>
          </template>
          <span>Delete Condition</span>
        </v-tooltip>
      </v-toolbar>
      <div ref="criteria" />
    </v-card>
  </v-container>
</template>
<script>
import Vue from 'vue'
import criteria from '../condition/criteria'
import criteriaGroup from '../condition/criteria-group'
import { organisePattern } from '../../../mock/condition/check'

export default {
	props: {
		currentCondition: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			condition: this.currentCondition,
		}
	},
	beforeMount() {
		const criteria = this.condition.criteria
		if (!criteria || criteria.length === 0) {
			this.$store.dispatch('mock/createCriterium', {
				conditionId: this.condition.id,
			})
		}
		this.patternArray = organisePattern(this.condition.pattern)
	},
	mounted() {
		console.log(this.condition)
		const criteriaLevel = 1
		this.patternArray.forEach(pattern => {
			console.log(this.$store.getters)
			if (pattern.type === 'criteria') {
				const ComponentClass = Vue.extend(criteria)
				const criterium = this.$store.getters['mock/criteriumByPattern']({
					conditionId: this.condition.id,
					criteriumId: +pattern.value
				})
				const instance = new ComponentClass({
					store: this.$store,
					propsData: {
						conditionId: this.condition.id,
						criterium,
						isAnd: pattern.isAnd,
						isFirst: pattern.isFirst,
						criteriaLevel,
					},
				})
				instance.$mount()
				this.$refs.criteria.appendChild(instance.$el)
			} else {
				const ComponentClass = Vue.extend(criteriaGroup)
				const instance = new ComponentClass({
					store: this.$store,
					propsData: {
						conditionId: this.condition.id,
						criteria: this.condition.criteria,
						pattern: pattern.value,
						isAnd: pattern.isAnd,
						isFirst: pattern.isFirst,
						criteriaLevel,
					},
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
				criteriaLevel: 1
			}
		})
		instance.$mount()
		this.$refs.criteria.appendChild(instance.$el) */
	},
	methods: {
		deleteCondition(conditionId) {
			// destroy the vue listeners, etc
			this.$destroy()

			// remove the element from the DOM
			this.$el.parentNode.removeChild(this.$el)
			this.$store.dispatch('mock/deleteCondition', conditionId)

			console.log(this.$store.getters)
		}
	},
}
</script>
