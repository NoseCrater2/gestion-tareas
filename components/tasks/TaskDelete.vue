<template>
  <app-dialog
  confirm-button-title="Eliminar"
  :is-loading-buttons="isDeleting"
  @closeDialog="cancelTaskDelete()"
  @confirmAction="confirmTaskDelete()">
    <template v-slot:title>
      ¿Eliminar tarea?
    </template>
    <template v-slot:content>
      ¿Eliminar tarea {{ todoTitle}}?
    </template>
  </app-dialog>
</template>

<script>
/**
 * Dialogo de confirmación de eliminación de tarea
 */
export default {
  components:{
    AppDialog: () => import('../Layout/AppDialog.vue'),
  },
  props: {
    /**
     * Titulo de la tarea
     */
    todoTitle: {
      type: String,
      required: true,
      default: null,
    },
    /**
     * Id de la tarea, se  requiera para el servicio de eliminación
     */
    todoId: {
      type: Number,
      required: true,
      default: 0,
    }
  },

  data() {
    return {
      isDeleting: false,
    }
  },


  methods: {

    /**
     * Emite el evento que se genera al hacer click en el botón de cancelación
     */
    cancelTaskDelete(){
      this.$emit('closeDialog', false);
      this.isDeleting = false;
    },

    /**
     * Lalama la acción del store encargada de consumir el servicio de eliminación de tarea y cierra el dialogo
     */
    confirmTaskDelete(){
      this.isDeleting = true;
      this.$store.dispatch('deleteById', this.todoId).then(() => {
        this.$emit('closeDialog', true);
      });
      this.$store.dispatch('fetchAll');
    }

  }
}

</script>
