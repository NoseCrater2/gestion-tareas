<template>

  <v-app >

    <AppNavBar  :title="title" />

    <v-main>
      <AlertResponse  />
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <AppFooter :title="title" />

  </v-app>

</template>

<script>
export default {
  name: 'DefaultLayout',
  components: {
    AlertResponse: () => import('../components/AlertResponse'),
    AppFooter: () => import('../components/Layout/AppFooter'),
    AppNavBar: () => import('../components/Layout/AppNavBar')
  },
  data() {
    return {
      title: 'GESTIÓN DE TAREAS',
    }
  }
}
</script>
