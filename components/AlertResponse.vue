<template>
  <v-snackbar
      class="ma-0 pa-0"
      :timeout="2000"
      :value="responseStatus.code !== 0"
      absolute
      right
      top
      :color="applyColor()"
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
    applyColor(){
      switch (this.responseStatus.code) {
        case 200:
          return 'success';
        case 201:
          return 'warning';
        case 401:
        case 404:
        case 500:
        case 403:
          return 'error';
      }
    },
    hideAlert(){
      setTimeout(() => {
        this.$store.commit(
          'setResponseStatus',
        {
          code: 0,
          message: null
        }
        )
      }, 2000);
    }
  },

}

</script>

<style>
.success{
  background-color: green;
  color: white;
}
</style>
