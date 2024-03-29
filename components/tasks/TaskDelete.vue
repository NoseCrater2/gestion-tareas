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
export default {
  components:{
    AppDialog: () => import('../Layout/AppDialog.vue'),
  },
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
      isDeleting: false,
    }
  },


  methods: {

    cancelTaskDelete(){
      this.$emit('closeDialog', false);
      this.isDeleting = false;
    },

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
