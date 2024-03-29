<template>

  <v-row justify="center" align="center">

    <v-col>
      <TaskList :task-list="todoList" @getTaskSelected="changeTask($event)" />
    </v-col>

    <TaskDetail v-if="taskSelected"  :task-id="taskSelected" @closeDetails="resetVariables()" @openEditDialog="assignTodo()" />

    <TaskForm v-if="isOpenForm" :todo-edit="todoEdit"  @closeDialog="isOpenForm = false;"   />

    <v-btn fab large color="primary" class="add-button" @click="openForm()">
      <v-icon >
        mdi-plus
      </v-icon>
    </v-btn>

  </v-row>

</template>

<script>
export default {
  name: 'IndexPage',
  components: {
    TaskDetail: () => import('../components/tasks/TaskDetail.vue'),
    TaskForm: () => import('../components/tasks/TaskForm.vue'),
    TaskList: () => import('../components/tasks/TaskList.vue'),
  },
  data() {
    return {
      taskSelected: null,
      isOpenForm: false,
      todoEdit: null,
    }
  },

  computed: {
    /**
     * retorna la lista de tareas almacenada en el store o un array vació
     */
    todoList(){
      return this.$store.state.todoList
    },
    /**
     * Retorna la información completa de una tarea almacenada en el store o un null
     */
    todoDetails(){
      return this.$store.state.details
    },

  },

  /**
   * Al tener el componente montado se llama al servicio de obtención de tareas
   */
  mounted(){
    this.$store.dispatch('fetchAll')
  },

  methods: {
    /**
     * Abre el formulario para crear una nueva tarea
     */
    openForm(){
      this.isOpenForm = true;
    },


    /**
     * Asigna el valor de los detalles de tarea a la variable para editar y abre el forumlario de edición
     */
    assignTodo(){
      this.todoEdit = Object.assign({}, this.todoDetails)
      this.openForm();
    },

    /**
     * Resetea variables a su estado inicial
     */
    resetVariables(){
      this.taskSelected = null;
      this.todoEdit = null;
      this.$store.commit('setTodoDetails', null);
    },

    /**
     * Recibe el id emitido desde el componente de tasklist para ser asingnado a la variable tasSelected local
     * @param {number} task
     */
    changeTask(task){
      this.taskSelected = task;
    }
  }
}
</script>

<style>
.add-button{
  position: fixed;
  bottom: 64px;
  right: 24px;
}
</style>
