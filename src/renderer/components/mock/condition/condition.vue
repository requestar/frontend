<template>
  <v-container>
    <v-card
      class="mx-auto"
      shaped
    >
      <v-toolbar dense>
        <v-card-title class="headline">
          {{ condition.name }}
          <!-- <v-text-field /> -->
        </v-card-title>
        <v-spacer />
        <v-hover v-slot:default="{ hover }" open-delay="200">
          <v-btn
            elevation="2"
            color="blue"
            :dark="hover ? true : false"
            :outlined="hover ? false : true"
            raised
            @click="deleteCondition"
          >
            <v-icon size="large">mdi-delete</v-icon>
          </v-btn>
        </v-hover>
      </v-toolbar>
      <div ref="criteria" />
    </v-card>
  </v-container>
</template>
<script>
import Vue from 'vue'
import criteria from '../condition/criteria';

export default {
	props : ['condition'],
	mounted(){
		const ComponentClass = Vue.extend(criteria)
		const instance = new ComponentClass({
			propsData: {
				criteriaType : 'param',
				isFirst: true
			}
		})
		instance.$mount()
		this.$refs.criteria.appendChild(instance.$el)
	},
	methods: {
		deleteCondition(){
			// destroy the vue listeners, etc
			this.$destroy();

			// remove the element from the DOM
			this.$el.parentNode.removeChild(this.$el);
		}
	}
}
</script>