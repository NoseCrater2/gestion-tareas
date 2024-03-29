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

      <v-card v-if="todoDetails" flat >

        <v-card-title>
         {{ todoDetails.title}}
        </v-card-title>

        <v-card-subtitle class="d-flex justify-space-between">
          <div>
            <v-icon>mdi-calendar</v-icon>
            <span>{{ todoDetails.due_date }}</span>
          </div>

          <v-icon>
            {{todoDetails.is_completed ? 'mdi-clock-check-outline':'mdi-av-timer'}}
          </v-icon>
        </v-card-subtitle>
        <v-card-text>
          <span class="font-weight-black">Descripción:</span>
          <p v-if="!todoDetails.description" class="text-center">
            Sin descripción
          </p>
          <p >
            {{ todoDetails.description }}
          </p>
        </v-card-text>
        <v-card-text>
          <span class="font-weight-black">Comentarios:</span>
          <p v-if="!todoDetails.comments" class="text-center">
            Sin comentarios
          </p>
          <p >
            {{ todoDetails.comments }}
          </p>

        </v-card-text>
        <v-card-text v-if="todoDetails.tags">
          <v-chip
          v-for="tag in todoDetails.tags.split(',')"
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
      <TaskDelete v-if="isDeleteDialogOpen" :todo-title="todoDetails.title" :todo-id="todoDetails.id" @closeDialog="closeDeleteDialog($event)" />
    </v-navigation-drawer>
</template>

<script>
export default {
  components: {
    TaskDelete: () => import('./TaskDelete.vue'),
  },
  props:{
    taskId: {
      type: Number,
      required: true,
      default: 0
    }
  },

  data(){
    return {
      isDeleteDialogOpen: false,
    }
  },

  computed: {
    todoDetails(){
      return this.$store.state.details
    },

  },

  watch:{
    taskId( newValue){
      this.$store.dispatch('fetchById', newValue);
    }
  },

  mounted(){
    this.$store.dispatch('fetchById', this.taskId);
  },


  methods:{
    closeDetails(){
      this.$emit('closeDetails')
    },
    openEditDialog(){
      this.$emit('openEditDialog')
    },
    closeDeleteDialog(isDeleted){
      this.isDeleteDialogOpen = false;
      if(isDeleted){
        this.closeDetails();
      }
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
