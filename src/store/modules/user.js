import { loginApi, logOut, getInfo } from "@/api/user"
import {
  _setSessionStore,
  _getSessionStore,
  _removeSessionStore
} from '@/utils/storage'
import { resetRouter } from '@/router'

const state = {
  token: _getSessionStore(),
  userInfo:{}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  USER_INFO: (state, data) => {
    state.userInfo = data
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginApi(userInfo).then(response => {
        if (response.token) {
          commit('SET_TOKEN', response.token)
          _setSessionStore(response.token)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        commit('USER_INFO', response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logOut({ commit }) {
    return new Promise((resolve, reject) => {
      logOut().then(() => {
        commit('SET_TOKEN', '')
        _removeSessionStore()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  // resetToken({ commit }) {
  //   return new Promise(resolve => {
  //     commit('SET_TOKEN', '')
  //     commit('SET_ROLES', [])
  //     removeToken()
  //     resolve()
  //   })
  // },

  // dynamically modify permissions
  // changeRoles({ commit, dispatch }, role) {
  //   return new Promise(async resolve => {
  //     const token = role + '-token'

  //     commit('SET_TOKEN', token)
  //     setToken(token)

  //     const { roles } = await dispatch('getInfo')

  //     resetRouter()

  //     // generate accessible routes map based on roles
  //     const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

  //     // dynamically add accessible routes
  //     router.addRoutes(accessRoutes)

  //     // reset visited views and cached views
  //     dispatch('tagsView/delAllViews', null, { root: true })

  //     resolve()
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
