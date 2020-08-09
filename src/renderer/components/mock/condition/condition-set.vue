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
      <div class="condition-set">
        <condition v-for="condition in conditionSet" :key="condition.id" :current-condition="condition" />
      </div>
    </v-card>
    <v-container />
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

import condition from '../condition/condition';

export default {
	components: {
		condition
	},
	computed: {
		conditionSet () {
			return this.$store.state.mock.conditions
		}
	},
	beforeMount() {
		if(!this.conditionSet || this.conditionSet.length === 0){
			this.$store.commit('mock/createCondition');
		}
	},
	methods: {
		addCondition(){
			const newCondition = {
				name: 'new',
				id: new Date().getTime()
			};
			this.conditionArray.push(newCondition);
			this.$store.commit('mock/pushCondition', newCondition);
		},
		...mapMutations({
			toggle: 'mock/add'
		})
	}
}
</script>
