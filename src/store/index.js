import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // 修改state的时候会在控制台打印一个logger

Vue.use(Vuex)
// 测试环境用的
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  state,
  mutations,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})