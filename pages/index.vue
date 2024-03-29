<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-card flat >
      <v-subheader>Selecciona una tarea para mostrar sus detalles</v-subheader>
      <v-list max-height="75vh" style="overflow: auto">
      <v-list-item-group v-model="itemSelected">
        <template v-for="(item, index) in todoList">
          <v-list-item :key="item.id" :value="item.id">
              <v-list-item-avatar size="50">
                <v-icon v-if="item.is_completed" color="success" size="50">
                  mdi-check-circle
                </v-icon>
                <v-icon v-else size="50">
                  mdi-clock
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title >{{item.title}}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text > {{ item.due_date }}</v-list-item-action-text>
              </v-list-item-action>
          </v-list-item>
          <v-divider
            v-if="index < todoList.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
  </v-col>
    <TodoDetail v-if="itemSelected"  :task-id="itemSelected" @closeDetails="resetVariables()" @openEditDialog="assignTodo()" />
    <TodoForm v-if="isOpenForm" :todo-edit="todoEdit"  @closeDialog="isOpenForm = false;"   />
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
    TodoDetail: () => import('../components/TodoDetail.vue'),
    TodoForm: () => import('../components/TodoForm.vue'),
  },
  data() {
    return {
      itemSelected: null,
      todo: null,
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
      this.itemSelected = null;
      this.todoEdit = null;
      this.$store.commit('setTodoDetails', null);
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
