<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on : tooltip }">
      <v-dialog v-model="dialog" persistent max-width="80%">
        <template v-slot:activator="{ on : dialog }">
          <v-chip
            class="mr-2"
            :color="currentCondition.color"
            outlined
            v-on="{ ...tooltip, ...dialog }"
          >
            <i class="fa fa-code" aria-hidden="true" />
          </v-chip>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Response Editor</span>
          </v-card-title>
          <v-container>
            <v-textarea
              auto-grow
              clearable
              no-resize
              outlined
              placeholder="Paste or Type your JSON Response here."
              row-height="24px"
              rows="15"
              shaped
              solo
            />
          </v-container>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <span>Open Response Editor</span>
  </v-tooltip>
</template>

<script>
export default {
	props: {
		currentCondition: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		dialog: false,
	}),
}
</script>