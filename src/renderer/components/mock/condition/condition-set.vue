<template>
  <v-container>
    <v-card
      class="mx-auto"
      shaped
      elevation="24"
    >
      <v-toolbar dense dark>
        <v-card-title class="headline">Conditions</v-card-title>
        <v-spacer />
        <v-hover v-slot:default="{ hover }" open-delay="200">
          <v-btn
            elevation="2"
            color="blue"
            :dark="hover ? true : false"
            :outlined="hover ? false : true"
            raised
            @click="addCondition"
          >
            <v-icon size="large">mdi-plus</v-icon>
            Condition
          </v-btn>
        </v-hover>
      </v-toolbar>
      <div ref="condition-set" />
    </v-card>
    <v-container />
  </v-container>
</template>

  <!-- <v-container>
    <v-card color="indigo lighten-4" tile>
      <v-toolbar dense dark>
        <v-toolbar-title>Conditions</v-toolbar-title>
      </v-toolbar>
      <condition v-for="condition in conditions" condition-type="">
        <condition condition-type="header" />
        <condition condition-type="param" />
        <condition condition-type="formBody" />
      </condition>
    </v-card>
  </v-container> -->

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
