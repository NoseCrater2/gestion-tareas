<template>
  <v-dialog
      v-model="dialog"
      max-width="500"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
         {{ todoEdit ? 'Editar':'Nueva'}} tarea
        </v-card-title>

        <v-card-text>

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
          min-width="auto"
          >
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
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="error" :loading="isLoadingResponse" @click="closeDialog()">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" :loading="isLoadingResponse" @click="saveTodo()">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {

  props: {
    todoEdit: {
      type: Object,
      required: false,
      default: null,
    }
  },

  data() {
    return {
      dialog: true,
      isOpenCalendar: false,
      isLoadingResponse: false,
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
    closeDialog(){
      this.$emit('closeDialog');
      this.isLoadingResponse = false;
    },

    saveTodo(){
      if( !this.$refs.taskForm.validate()){
        return;
      }
      this.isLoadingResponse = true;
      if(this.todoEdit){
        this.$store.dispatch('updateById', this.todo).then(() => {
          this.closeDialog()
        });
        return;
      }
      this.$store.dispatch('createTodo', this.todo).then(() => {
          this.closeDialog()
      });
    }


  },




}

</script>
