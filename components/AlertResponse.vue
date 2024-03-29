<template>
  <v-snackbar
      app
      :timeout="timeInScreen"
      :value="responseStatus.code !== null"
      right
      top
      :color="responseStatus.code"
      @input="hideAlert()"
    >
    <div class="d-flex justify-space-between">
      <span>
        {{ responseStatus.message }}
      </span>
      <v-icon v-if="responseStatus.code === 'success'" color="white">mdi-check-circle</v-icon>
      <v-icon v-if="responseStatus.code === 'warning'" color="white">mdi-close</v-icon>
    </div>
    </v-snackbar>
</template>
<script>

/**
 * Componente para mostrar los mensajes y estado de las solicitudes a la api
 */
export default {
  data(){
    return {
      timeInScreen: 2000,
    }
  },
  computed:{
    responseStatus(){
      return this.$store.getters.getResponseStatus
    }
  },
  methods: {

    /**
     * Esconde la alerta reseteando el ResponseStatus del store
     * que almacenan el estatus de una solicitud a la api
     */
    hideAlert(){
      setTimeout(() => {
        this.$store.commit(
          'setResponseStatus',
        {
          code: null,
          message: null
        }
        )
      }, this.timeInScreen);
    }
  },

}
</script>

