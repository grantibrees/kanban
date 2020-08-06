
import api from "../axiosService"
import router from '../router/index'




export default {
  state: {

  },
  mutations: {

  },
  actions: {
    getTasks({ commit, dispatch }, listId) {
      api.get('lists/' + listId + '/tasks')
        .then(res => {
          console.log(res);
          let data = {
            listId: listId,
            tasks: res.data
          }
          commit('setTasks', data)
        })
    },
    async addTask({ commit, dispatch }, payload) {
      try {
        let res = await api.post('tasks/', payload)
        console.log(res.data);
        dispatch('getTasks', payload.listId)
      } catch (error) { console.error(error) }
    },
    async editTaskDescription({ commit, dispatch }, payload) {
      try {

        let res = await api.put("tasks/" + payload.taskId, payload)
        console.log(res);

      } catch (error) { console.error(error) }
    },

    setTaskToMove({commit, dispatch}, data) {
      commit("setTaskToMove", data)
    },
    moveTask({commit, dispatch}, moveData) {
      console.log(moveData);
      commit("removeFromList", moveData)
      commit("addToList", moveData)
    },
  },
    async addComment({ commit, dispatch }, payload) {
      try {
        let res = await api.post('tasks/' + payload.taskId + '/comments', payload)
        console.log(res);
        let data = {
          listId: res.data.listId,
          newTask: [res.data]
        }
        commit('setComments', data)
      } catch (error) { console.error(error) }
    },
    async editComment({ commit, dispatch }, payload) {
      try {
        let res = await api.post('tasks/' + payload.taskId + '/comments/' + payload.commentId, payload)
        console.log(res);
      } catch (error) { console.error(error) }
    }
  }

}

