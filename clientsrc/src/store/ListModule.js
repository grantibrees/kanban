
import api from "../axiosService"
import router from '../router/index'




export default {
  state: {

  },
  mutations: {

  },
  actions: {
    getLists({ commit, dispatch }, boardId) {
      api.get('lists' + boardId)
        .then(res => {
          console.log(res);
          let data = {
            boardId: boardId,
            lists: res.data
          }
          commit('setLists', data)
        })
    },
    async addList({ commit, dispatch }, payload) {
      try {
        let res = await api.post('lists/' + payload.boardId, payload)
        console.log(res.data);
        dispatch('getLists', payload.boardId)
      } catch (error) { console.error(error) }
    },

  },

}

