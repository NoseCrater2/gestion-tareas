<template>
  <v-dialog
      v-model="dialog"
      width="500"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
        Eliminar tarea
        </v-card-title>

        <v-card-text>
          ¿Eliminar tarea {{ todoTitle}}?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn  @click="closeDialog()">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="deleteTodo()">
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {

  props: {
    todoTitle: {
      type: String,
      required: true,
      default: null,
    },
    todoId: {
      type: Number,
      required: true,
      default: 0,
    }
  },

  data() {
    return {
      dialog: true,

    }
  },


  methods: {

    closeDialog(){
      this.$emit('closeDialog');
    },

    deleteTodo(){
      this.$store.dispatch('deleteById', this.todoId);
      this.$store.dispatch('fetchAll');
    }

  },
}

</script>
