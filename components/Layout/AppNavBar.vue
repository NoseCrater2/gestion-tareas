<template>
  <v-app-bar color="primary" app>
    <v-app-bar-nav-icon class="white--text"></v-app-bar-nav-icon>
    <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon color="white">mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    title:{
      type: String,
      required: true
    }
  }
}
</script>
