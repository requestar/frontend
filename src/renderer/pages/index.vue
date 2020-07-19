<template>
  <v-app>
    <v-main>
      <div ref="main" />
      <urlBar />
      <conditionSet conditions="conditions" />
    </v-main>
  </v-app>
</template>
<script>
import { conditions } from '../mock/condition/condition'

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