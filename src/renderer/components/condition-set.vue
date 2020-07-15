<template>
  <v-container>
    <v-card color="indigo lighten-4" tile>
      <v-toolbar dense dark>
        <v-toolbar-title>Conditions</v-toolbar-title>

        <v-spacer />

        <v-hover v-slot:default="{ hover }" open-delay="200">
          <v-btn elevation="2" color="red" :dark="hover ? true : false" :outlined="hover ? false : true" raised class="mr-10" @mouseover="hover = true">
            <v-icon size="large">mdi-plus</v-icon>
            Header(H)
          </v-btn>
        </v-hover>

        <v-hover v-slot:default="{ hover }" open-delay="200">
          <v-btn elevation="2" color="blue" :dark="hover ? true : false" :outlined="hover ? false : true" raised class="mr-10">
            <v-icon size="large">mdi-plus</v-icon>
            Param(P)
          </v-btn>
        </v-hover>

        <v-hover v-slot:default="{ hover }" open-delay="200">
          <v-btn elevation="2" color="green" :dark="hover ? true : false" :outlined="hover ? false : true" raised>
            <v-icon size="large">mdi-plus</v-icon>
            Form Body(FB)
          </v-btn>
        </v-hover>
      </v-toolbar>
      <condition condition-type="header" />
      <condition condition-type="param" />
      <condition condition-type="formBody" />
    </v-card>
  </v-container>
</template>

<script>
import Vuetify from 'vuetify'
import { conditionChecks } from '../../config/theme'

class Condition {
    check
}

export default {
    vuetify: new Vuetify(),
    components: {
        condition: () => import('../components/condition')
    },
    data: () => {
        return {
            conditionChecks,
            Condition
        }
    }
}
</script>

<style></style>
