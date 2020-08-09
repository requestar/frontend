<template>
  <v-app>
    <v-main>
      <div ref="main" />
      <urlBar />
      <conditionSet />
    </v-main>
  </v-app>
</template>
<script>
import Vue from 'vue';
import { conditions } from '../mock/condition/condition'
Vue.config.devtools = true;

export default {
	components: {
		urlBar: () => import('../components/url-bar.vue'),
		conditionSet: () => import('../components/mock/condition/condition-set.vue')
	},
	data () {
		return {
			conditions
		}
	}
}
</script>