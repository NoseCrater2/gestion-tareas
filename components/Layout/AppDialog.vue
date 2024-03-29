<template>
  <v-dialog max-width="500"  :fullscreen="$vuetify.breakpoint.mobile" persistent :value="true">
    <v-card>
      <v-card-title>
        <slot name="title">

        </slot>
      </v-card-title>
      <v-card-text>
        <slot name="content">

        </slot>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn :color="cancelButtonColor" :loading="isLoadingButtons" @click="onCancelAction()">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :color="confirmButtonColor" :loading="isLoadingButtons" @click="onConfirmAction()">
           {{ confirmButtonTitle }}
          </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    confirmButtonTitle: {
      type: String,
      required: true
    },
    confirmButtonColor: {
      type: String,
      required: false,
      default: 'primary'
    },
    cancelButtonColor: {
      type: String,
      required: false,
      default: 'error'
    },
    isLoadingButtons: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods:{
    onCancelAction(){
      this.$emit('closeDialog');
    },

    onConfirmAction(){
      this.$emit('confirmAction');
    }

  }
}
</script>
