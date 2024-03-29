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
    todoList(){
      return this.$store.state.todoList
    },

    todoDetails(){
      return this.$store.state.details
    },

  },

  mounted(){
    this.$store.dispatch('fetchAll')
  },

  methods: {
    openForm(){
      this.isOpenForm = true;
    },

    assignTodo(){
      this.todoEdit = Object.assign({}, this.todoDetails)
      this.openForm();
    },

    resetVariables(){
      this.taskSelected = null;
      this.todoEdit = null;
      this.$store.commit('setTodoDetails', null);
    },

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
