<template>
  <v-container class="d-flex flex-row">
    <v-chip
      class="headline ma-2 mt-0"
      color="blue"
      outlined
      large
    >
      &&
    </v-chip>
    <v-card
      class="px-3 py-3"
      style="width:100%;"
      shaped
    >
      <div ref="criteria" />
    </v-card>
  </v-container>
</template>
<script>
import Vue from 'vue'
import criteria from '../condition/criteria';

export default {
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
}
</script>