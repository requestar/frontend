<template>
  <v-card class="d-flex flex-row">
    <v-col md="3" class="d-flex flex-row mb-6">
      <v-chip class="headline ma-2 mt-0" :color="condition.color" outlined large>
        {{ condition.shortText.toUpperCase() }}
      </v-chip>
      <v-text-field label="Key" :color="condition.color" outlined />
    </v-col>
    <v-col md="2">
      <v-select
        :items="conditionChecks"
        full-width
        label="Check"
        item-text="text"
        item-value="value"
        outlined
        :color="condition.color"
      />
    </v-col>
    <v-col md="5">
      <v-text-field label="Value" :color="condition.color" outlined />
    </v-col>
    <v-col md="2" class="d-flex flex-row">
      <v-chip class="mr-2" color="red" outlined>
        <v-icon size="medium">mdi-plus</v-icon>
        H
      </v-chip>
      <v-chip class="mr-2" color="blue" outlined>
        <v-icon size="medium">mdi-plus</v-icon>
        P
      </v-chip>
      <v-chip class="mr-2" color="green" outlined>
        <v-icon size="medium">mdi-plus</v-icon>
        FB
      </v-chip>
    </v-col>
  </v-card>
</template>

<script>
import Vuetify from 'vuetify'
import { Condition, conditionChecks } from '../../config/theme'

export default {
    vuetify: new Vuetify(),
    props: {
        conditionType: {
            type: String,
            default: 'param',
            required: true
        }
    },
    data () {
        const conditionType = this.conditionType
        console.log(conditionType)
        return {
            conditionChecks,
            condition: Condition[conditionType]
        }
    }
}
</script>

<style></style>
