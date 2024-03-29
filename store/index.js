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

  fetchById({ commit }, taskId) {
   this.$axios.get(`tasks/${taskId}`).then(({data})=> {
    commit('setTodoDetails', data[0]);
    commit('setResponseStatus',{code: 'success', message: data.detail || 'Task loaded'})
   }).catch(({response})=>{
    commit('setResponseStatus',{code: 'error', message: response.data.detail})
  })


  },

 createTodo({ commit }, todo) {
  this.$axios.post(`tasks`, todo).then(({data})=> {
    commit('addTodo', data.task);
    commit('setResponseStatus',{code: 'success', message: data.detail})
  }).catch(({response})=>{
    commit('setResponseStatus',{code: 'error', message: response.data.detail})
  })
  },

  updateById({ commit }, todo) {
    this.$axios.put(`tasks/${todo.id}`, todo).then(({data})=> {
      commit('updateTodo', data.task)
      commit('setTodoDetails', data.task)
      commit('setResponseStatus',{code: 'success', message: data.detail})
    }).catch(({response})=>{
      commit('setResponseStatus',{code: 'error', message: response.data.detail})
    })

  },

  deleteById({ commit }, taskId) {
    this.$axios.delete(`tasks/${taskId}`).then(({data})=> {
      commit('setResponseStatus',{code: 'success', message: data.detail})
    }).catch(({response})=>{
      commit('setResponseStatus',{code: 'error', message: response.data.detail})
    })

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
}
