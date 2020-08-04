import Vue from 'vue'
import Vuex from 'vuex'
import api from "../axiosService"
import router from '../router/index'
import BoardModule from "./BoardModule"
import ListModule from "./ListModule"
import TaskModule from "./TaskModule"

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'



export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, activeBoardData) {
      state.activeBoard = activeBoardData
    },
    setLists(state, listData) {
      state.lists = listData
    },
    setTasks(state, taskData) {
      debugger
      state.tasks.push(taskData)
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },

  },
  modules: {
    BoardModule,
    ListModule,
    TaskModule
  }
})
