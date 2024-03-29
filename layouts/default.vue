<template>
  <v-app >

    <v-app-bar
      color="pink"
      app
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <AlertResponse  />
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer absolute app class="text-center">
      <v-row justify="center" no-gutters>
        <v-col>
          {{ title }}<br> <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-col>
      </v-row>

    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  components: {
    AlertResponse: () => import('../components/AlertResponse.vue')
  },
  data() {
    return {
      title: 'GESTIÓN DE TAREAS',
    }
  }
}
</script>
