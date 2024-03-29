<template>
  <div>
   <v-list-item  :value="item.id">
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
    <v-divider></v-divider>
  </div>
</template>

<script>

export default {
  props:{
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
