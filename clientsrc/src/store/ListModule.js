
import api from "../axiosService"
import router from '../router/index'




export default {
  state: {

  },
  mutations: {

  },
  actions: {
    getLists({ commit, dispatch }) {
      api.get('lists')
        .then(res => {
          console.log(res);
          commit('setLists', res.data)
        })
    },
    async addList({ commit, dispatch }, payload) {
      try {
        let res = await api.post('lists/' + payload.boardId, payload)
        console.log(res.data);
        dispatch('getLists')
      } catch (error) { console.error(error) }
    },

  },

}

