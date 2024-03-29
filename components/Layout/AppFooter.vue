<template>
  <v-footer absolute app class="text-center">
    <v-row justify="center" no-gutters>
      <v-col>
          {{ title }}<br> <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
/**
 * Footer de la app
 */
export default {
  props: {
    /**
     * Título de la app
     */
    title:{
      type: String,
      required: true
    }
  }
}
</script>
