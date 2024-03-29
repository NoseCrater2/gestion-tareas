export const state = () =>  ({
  todoList: [],
  details: null,
  responseStatus: {
    code: null,
    message: null
  },
});

export const getters = {
  getResponseStatus(state){
    return state.responseStatus
  }
}

export const actions = {
 fetchAll ({ commit }) {
    this.$axios.get('tasks').then(({data} ) => {
      commit('setTodoList', data)
      commit('setResponseStatus',{code: 'success', message: 'Tasks loaded'})
    }).catch(({response})=>{
      commit('setResponseStatus',{code: 'error', message: response.data.detail})
    })

  },

  async fetchById({ commit }, taskId) {
   const {status, data} = await this.$axios.get(`tasks/${taskId}`)
      commit('setTodoDetails', data[0]);
      commit('setResponseStatus',{code: status, message: 'Task loaded'})
  },

 async createTodo({ commit }, todo) {
   const {status, data} =  await this.$axios.post(`tasks`, todo)
    commit('addTodo', data.task);
    commit('setResponseStatus',{code: status, message: data.detail})
  },

  async updateById({ commit }, todo) {
    const {status, data} = await this.$axios.put(`tasks/${todo.id}`, todo)
    commit('updateTodo', data.task)
    commit('setTodoDetails', data.task)
    commit('setResponseStatus',{code: status, message: data.detail})
  },

  async deleteById({ commit }, taskId) {
    const {status, data} =  await this.$axios.delete(`tasks/${taskId}`)
    commit('setResponseStatus',{code: status, message: data.detail})
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

  setResponseStatus(state, responseStatus){
    state.responseStatus = responseStatus
  },

  toggle(state, todo) {
    todo.done = !todo.done
  }
}



