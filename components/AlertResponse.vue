<template>
  <v-snackbar
      app
      :timeout="2000"
      :value="responseStatus.code !== null"
      right
      top
      :color="responseStatus.code"
      @input="hideAlert()"
    >
   {{ responseStatus.message }}
    </v-snackbar>
</template>
<script>
export default {
  computed:{
    responseStatus(){
      return this.$store.getters.getResponseStatus
    }
  },
  methods: {
    hideAlert(){
      setTimeout(() => {
        this.$store.commit(
          'setResponseStatus',
        {
          code: null,
          message: null
        }
        )
      }, 2000);
    }
  },

}
</script>

