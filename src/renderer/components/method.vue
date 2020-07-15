<template>
  <v-container>
    <v-row>
      <v-col md="2">
        <v-select
          full-width
          :items="items"
          label="Select"
          outlined
        />
      </v-col>
      <v-col md="8">
        <v-text-field label="URL" outlined />
      </v-col>
      <v-col md="2">
        <v-btn outlined x-large color="primary">Send</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vuetify from 'vuetify'

export default {
    vuetify: new Vuetify(),
    data: () => ({
        items: [
            'GET',
            'POST',
            'PUT',
            'PATCH',
            'DELETE',
            'HEAD',
            'OPTIONS',
            'CUSTOM',
            'ALL'
        ]
    })
}
</script>

<style scoped></style>
