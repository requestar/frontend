<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on : tooltip }">
      <v-dialog v-model="dialog" persistent max-width="80%">
        <template v-slot:activator="{ on : dialog }">
          <v-chip
            class="mr-2"
            :color="color"
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
              ref="jsonEditor"
              v-model="responseText"
              auto-grow
              clearable
              no-resize
              outlined
              placeholder="Paste or Type your JSON Response here."
              row-height="24px"
              rows="15"
              shaped
              solo
              dense
              @keyup="validateJSON($event)"
            />
            <v-btn v-if="isValidJSON" class="beautify" absolute right @click="beautifyJSON">Beautify</v-btn>
          </v-container>
          <v-card-text>
            <pre ref="editorError" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="saveResponse();dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <span>Open Response Editor</span>
  </v-tooltip>
</template>

<script>
import jsonlint from "jsonlint";

let responseText = "";

export default {
	props: {
		response: {
			type: Object,
			required: true
		},
		color: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			dialog: false,
			isValidJSON: false,
			responseText: this.response.value
		}
	},
	created() {
		responseText = this.response && this.response.text || responseText;
	},
	methods: {
		validateJSON(event){
			const value = event.target.value;
			if(value && value.length > 1){
				try{
					const result = jsonlint.parse(value);
					if(result) {
						this.isValidJSON = true
						this.$refs.editorError.classList.remove('fail')
						this.$refs.editorError.textContent = ''
					}
				}
				catch(e){
					this.$refs.editorError.classList.add('fail')
					this.$refs.editorError.textContent = e.message
					this.isValidJSON = false
				}
			}
			else {
				this.$refs.editorError.classList.remove('fail')
				this.$refs.editorError.textContent = ''
				this.isValidJSON = false
			}
		},
		beautifyJSON(){
			const result = JSON.parse(this.responseText)
			this.responseText = JSON.stringify(result, null, '\t')
			this.isValidJSON = false
		},
		saveResponse(){
			this.$emit('printResponse', this.responseText)
		}
	}
}
</script>
<style scoped>
.fail {
	padding: 1em;
        background-color: #fee;
        color: #933;
        border: 2px solid #933;
      }
</style>