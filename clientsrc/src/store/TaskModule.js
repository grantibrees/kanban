
import api from "../axiosService"
import router from '../router/index'




export default {
  state: {

  },
  mutations: {

  },
  actions: {
    getTasks({ commit, dispatch }, listId) {
      api.get('tasks/' + listId)
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

  },

}

