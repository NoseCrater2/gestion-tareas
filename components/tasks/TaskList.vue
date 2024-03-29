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
    updateSelection(taskSelected){
      this.$emit('getTaskSelected', taskSelected);
    }
  }
}
</script>
