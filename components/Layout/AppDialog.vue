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
/**
 * Componente que crea un layout para los elementos mostrados a manera de dialogo o modal
 */
export default {
  props: {
    /**
     * Titulo para el botón de confirmación
     */
    confirmButtonTitle: {
      type: String,
      required: true
    },
     /**
     * Color para el botón de confirmación, puede ser de vuetify, css, hexadecimal, rgb, etc
     */
    confirmButtonColor: {
      type: String,
      required: false,
      default: 'primary'
    },
      /**
     * Color para el botón de cancelación, puede ser de vuetify, css, hexadecimal, rgb, etc
     */
    cancelButtonColor: {
      type: String,
      required: false,
      default: 'error'
    },
    /**
     * Bandera que indica cuando hay una tarea aincrona pendiente de completarse
     */
    isLoadingButtons: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods:{
    /**
     * Emite el evento que se dispara al hacer clic al botón de cancelación
     */
    onCancelAction(){
      this.$emit('closeDialog');
    },

     /**
     * Emite el evento que se dispara al hacer clic al botón de confirmación
     */
    onConfirmAction(){
      this.$emit('confirmAction');
    }

  }
}
</script>
