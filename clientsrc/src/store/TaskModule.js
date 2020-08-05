
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
    async addComment({ commit, dispatch }, payload) {
      try {
        let res = await api.post('tasks/' + payload.taskID + '/comments', payload.body)
        console.log(res);
        // commit('addComment', payload.body)
      } catch (error) { console.error(error) }


    }
  }

}

