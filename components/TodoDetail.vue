<template>
    <v-navigation-drawer
      absolute
      permanent
      right
      width="400px"
      class="elevation-2"
    >
      <v-toolbar-title class="ma-2">
        <v-btn icon  @click="closeDetails()">
          <v-icon color="error" size="30">mdi-close</v-icon>
        </v-btn>
        <span class="text-center">
          Detalles de tarea
        </span>
      </v-toolbar-title>

      <v-divider></v-divider>

      <v-card v-if="details === null">
        <span>
          Ocurrió un problema al cargar los detalles
        </span>
      </v-card>

      <v-card v-else flat>

        <v-card-title>
         {{ details.title}}
        </v-card-title>

        <v-card-subtitle class="d-flex justify-space-between">
          <div>
            <v-icon>mdi-calendar</v-icon>
            <span>{{ details.due_date }}</span>
          </div>

          <v-icon>
            {{details.is_completed ? 'mdi-clock-check-outline':'mdi-av-timer'}}
          </v-icon>
        </v-card-subtitle>
        <v-card-text>
          <span class="font-weight-black">Descripción:</span>
          <p v-if="!details.description" class="text-center">
            Sin descripción
          </p>
          <p >
            {{ details.description }}
          </p>
        </v-card-text>
        <v-card-text>
          <span class="font-weight-black">Comentarios:</span>
          <p v-if="!details.comments" class="text-center">
            Sin comentarios
          </p>
          <p >
            {{ details.comments }}
          </p>

        </v-card-text>
        <v-card-text v-if="details.tags">
          <v-chip
          v-for="tag in details.tags.split(',')"
          :key="tag"
          color="primary"
          >
          {{ tag }}
          </v-chip>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="to-bottom">

          <v-btn depressed color="warning" rounded @click="openEditDialog()">
            <v-icon right>mdi-pencil</v-icon>
            Editar
          </v-btn>
          <v-btn class="px-2" depressed color="error" rounded @click="isDeleteDialogOpen = true">
            <v-icon right>mdi-delete</v-icon>
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
      <TodoDeleteDialog v-if="isDeleteDialogOpen" :todo-title="details.title" :todo-id="details.id" @closeDialog="sDeleteDialogOpen = false" />
    </v-navigation-drawer>
</template>

<script>
export default {
  components: {
    TodoDeleteDialog: () => import('../components/TodoDeleteDialog.vue'),
  },
  props:{
    details: {
      type: Object,
      required: true,
    }
  },

  data(){
    return {
      isDeleteDialogOpen: false,
    }
  },

  methods:{
    closeDetails(){
      this.$emit('closeDetails')
    },
    openEditDialog(){
      this.$emit('openEditDialog')
    }
  },


}
</script>
<style>
.to-bottom{
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
