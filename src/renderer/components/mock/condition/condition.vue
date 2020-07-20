<template>
  <v-container fluid>
    <v-card
      class="mx-auto"
      shaped
    >
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
                @click="deleteCondition"
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
import criteria from '../condition/criteria';

export default {
	props: {
		condition: {
			type: Object,
			required: true
		}
	},
	mounted(){
		const ComponentClass = Vue.extend(criteria)
		const instance = new ComponentClass({
			propsData: {
				criteriaType : 'param',
				isFirst: true,
				criteriaLevel: 1
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