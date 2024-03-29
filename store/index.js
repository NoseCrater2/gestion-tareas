export const state = () =>  ({
  todoList: [],
  details: null,
  responseStatus: {
    code: 0,
    message: null,
    errors: []
  }
});

export const getters = {
  getResponseStatus(state){
    return state.responseStatus
  }
}

export const actions = {
  fetchAll ({ commit }) {
    this.$axios.get('tasks').then( ({data, status} )=> {

      commit('setTodoList', data)
      commit('setResponseStatus', status)

    }).catch( ({status}) => {
      commit('setResponseStatus', status)
    });

  },

  async fetchById({ commit }, id) {
    const details = await this.$axios.$get(`tasks/${id}`)
    commit('setTodoDetails', details[0])
  },
  async createTodo({ commit }, todo) {

    const {task} = await this.$axios.$post(`tasks`, todo)
    commit('addTodo', task)
  },

  async updateById({ commit }, todo) {
    const {task} = await this.$axios.$put(`tasks/${todo.id}`, todo)
    commit('updateTodo', task)
  },

  async deleteById({ commit }, id) {
    // const {detail} =
    await this.$axios.$delete(`tasks/${id}`)
  },


}


export const mutations = {

  setTodoList(state, list){
    state.todoList = list;
  },

  setTodoDetails(state, todo){
    state.details = todo;
  },

  addTodo(state, todo) {
    state.todoList.push(todo);
  },

  updateTodo(state, editedTodo) {

   const index = state.todoList.findIndex(todo =>  todo.id === editedTodo.id);
   state.todoList[index] = editedTodo;
  },
  setRemove(state,  todo ) {
    state.todoList.splice(state.todoList.indexOf(todo), 1)
  },

  setResponseStatus(state, {code, message, errors}){
    state.responseDetails = {code, message, errors};
  },

  toggle(state, todo) {
    todo.done = !todo.done
  }
}


