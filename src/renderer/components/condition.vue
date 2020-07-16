<template>
  <v-card :key="currentCondition.type" class="d-flex flex-row">
    <v-col md="3" class="d-flex flex-row mb-6">
      <v-chip class="headline ma-2 mt-0" :color="currentCondition.color" outlined large
              @click="convertCondition(currentCondition.type)"
      >
        {{ currentCondition.shortText.toUpperCase() }}
      </v-chip>
      <v-text-field label="Key" :color="currentCondition.color" outlined />
    </v-col>
    <v-col md="2">
      <v-select
        :items="conditionChecks"
        full-width
        label="Check"
        item-text="text"
        item-value="value"
        outlined
        :color="currentCondition.color"
      />
    </v-col>
    <v-col md="5">
      <v-text-field label="Value" :color="currentCondition.color" outlined />
    </v-col>
    <v-col md="2" class="d-flex flex-row">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-chip class="mr-2" v-bind="attrs"
                  :color="currentCondition.color" outlined v-on="on"
          >
            <v-icon size="medium">mdi-minus</v-icon>
          </v-chip>
        </template>
        <span>Delete Condition</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-chip class="mr-2" v-bind="attrs"
                  :color="currentCondition.color" outlined v-on="on"
          >
            <v-icon size="medium">mdi-plus</v-icon>
          </v-chip>
        </template>
        <span>Add Condition</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-chip class="mr-2" v-bind="attrs"
                  :color="currentCondition.color" outlined v-on="on"
          >
            <i class="fa fa-object-group" aria-hidden="true" />
          </v-chip>
        </template>
        <span>Add Condition Group</span>
      </v-tooltip>

      <!-- <v-chip v-for="condition in conditions" :key="condition.type" class="mr-2" :color="condition.color" outlined>
        <v-icon size="medium">mdi-plus</v-icon>
        {{ condition.shortText.toUpperCase() }}
      </v-chip> -->
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
        return {
            conditionChecks,
            currentCondition: Condition[this.conditionType],
            conditions: Condition
        }
    },
    methods: {
        convertCondition (conditionType) {
            this.currentCondition = Condition[Condition[conditionType].next]
        }
    }
}
</script>

<style></style>
