<template>
  <app-dialog
  confirm-button-title="Guardar"
  :is-loading-buttons="isCreateTaskLoading"
  @closeDialog="closeTaskCreate()"
  @confirmAction="confirmTaskCreate()">

    <template v-slot:title>
      {{ todoEdit ? 'Editar':'Nueva'}} tarea
    </template>

    <template v-slot:content>

      <v-form ref="taskForm" class="ma-2" >

        <v-text-field
        v-model="todo.title"
        dense
        :rules="[title => !!title || 'Título obligatorio']"
        label="Título"
        ></v-text-field>

        <v-checkbox
        v-model="todo.is_completed"
        dense
        label="Marcar como completado"
        ></v-checkbox>

        <v-menu
        v-model="isOpenCalendar"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="todo.due_date"
              dense
              label="Fecha límite"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
          v-model="todo.due_date"
            :min="new Date().toISOString()"
            @input="isOpenCalendar = false"
          ></v-date-picker>
        </v-menu>

        <v-textarea
        v-model="todo.description"
        label="Descripcion"
         outlined
        ></v-textarea>

        <v-text-field
        v-model="todo.tags"
        label="Tags"
        dense
        outlined
        ></v-text-field>

        <v-textarea
        v-model="todo.comments"
        dense
        filled
        outlined
        label="Comentarios"
        ></v-textarea>

      </v-form>
    </template>

  </app-dialog>
</template>

<script>
export default {
  components:{
    AppDialog: () => import('../Layout/AppDialog.vue')
  },
  props: {
    todoEdit: {
      type: Object,
      required: false,
      default: null,
    }
  },

  data() {
    return {
      isOpenCalendar: false,
      isCreateTaskLoading: false,
      todo: {
        id: null,
        title: null,
        is_completed: false,
        due_date: null,
        comments: null,
        description: null,
        tags: null,
        token: 'ABCDE'
      }
    }
  },

  created(){

    if(!this.todoEdit){
      return;
    }
    this.todo = this.todoEdit;

  },

  methods: {
    closeTaskCreate(){
      this.$emit('closeDialog');
      this.isCreateTaskLoading = false;
    },

    confirmTaskCreate(){
      if( !this.$refs.taskForm.validate()){
        return;
      }
      this.isCreateTaskLoading = true;
      if(this.todoEdit){
        this.$store.dispatch('updateById', this.todo).then(() => {
          this.closeTaskCreate();
        });
        return;
      }
      this.$store.dispatch('createTodo', this.todo).then(() => {
        this.closeTaskCreate();
      });
    }
  },
}

</script>
