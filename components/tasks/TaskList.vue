<template>
  <v-card flat >
      <v-subheader>Selecciona una tarea para mostrar sus detalles</v-subheader>
      <v-list max-height="75vh" style="overflow: auto">
      <v-list-item-group @change="updateSelection($event)">
         <TaskItem  v-for="task in taskList" :key="task.id"  :item="task"  />
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>

/**
 * Contenedor para el listado de tareas
 */
export default {

  components: {
    TaskItem: () => import('./TaskItem.vue'),
  },

  props: {
    taskList: {
      type: Array,
      required: true
    }
  },


  methods:{
    /**
     * Emite el id de la tarea seleccionada a su componente padre
     * @param number taskSelected
     */
    updateSelection(taskSelected){
      this.$emit('getTaskSelected', taskSelected);
    }
  }
}
</script>
