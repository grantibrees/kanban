
import api from "../axiosService"
import router from '../router/index'




export default {
  state: {

  },
  mutations: {

  },
  actions: {
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          console.log(res);
          commit('setBoards', res.data)
        })
    },

    getActiveBoard({ commit, dispatch }, boardId) {
      api.get('boards/' + boardId)
        .then(res => {
          console.log(res.data);
          commit('setActiveBoard', res.data)
        }).catch(err => {
          console.error(err);
        })
    },

    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },

    async deleteBoard({ commmit, dispatch }, boardId) {
      try {
        let res = await api.delete('boards/' + boardId)
        dispatch("getBoards")
      } catch (error) { console.error(error) }
    },
  },
}
