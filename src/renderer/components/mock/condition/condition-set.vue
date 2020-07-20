<template>
  <v-container fluid style="width:90%">
    <v-card
      class="mx-auto"
      shaped
      elevation="24"
    >
      <v-toolbar dense dark>
        <v-card-title class="headline">Conditions</v-card-title>
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
                @click="addCondition"
              >
                <v-icon size="large">mdi-plus</v-icon>
                Condition
              </v-btn>
            </v-hover>
          </template>
          <span>Add Condition</span>
        </v-tooltip>
      </v-toolbar>
      <div ref="condition-set" />
    </v-card>
    <v-container />
  </v-container>
</template>

<script>
import Vue from 'vue'
import condition from '../condition/condition';
import { conditionChecks } from '../../../mock/condition/check'

export default {
	components: {
	},
	props: ['conditions'],
	data: () => {
		return {
			conditionChecks
		}
	},
	mounted() {
		const ComponentClass = Vue.extend(condition)
		const instance = new ComponentClass({
			propsData: {
				condition : {
					name: 'new'
				}
			}
		})
		instance.$mount()
		this.$refs['condition-set'].appendChild(instance.$el)
	},
	methods: {
		addCondition(){
			const ComponentClass = Vue.extend(condition)
			const instance = new ComponentClass({
				propsData: {
					condition : {
						name: 'new'
					}
				}
			})
			instance.$mount()
			this.$refs['condition-set'].appendChild(instance.$el)
		}
	}
}
</script>
