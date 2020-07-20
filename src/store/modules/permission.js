import asyncRoutes from '@/router/asyncRoutes'
import { getAuthList } from "@/api/systemSetting"
let constantRoutes = []

const state = {
  routes: [],
  addRoutes: [],
  dataPermission:[],
  menuList:[]
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = routes
  },
  SET_DATAPERMISSION: (state, authList) => {
    state.dataPermission = authList
  },
  SET_MENLIST: (state, menuList) => {
    state.menuList = menuList
  },
}

const actions = {
  getMenuRouterList({ commit }) {
    return new Promise(resolve => {
      getAuthList({type:0}).then(res => {
        if (res.code === 20000 && res.data) {
          commit('SET_MENLIST', res.data.menuList)
          sortMenuList(res.data.menuList)
          commit('SET_DATAPERMISSION', res.data.authList)
          commit('SET_ROUTES', constantRoutes)
        } else {
          constantRoutes.push({path: '*', redirect: '/404', hidden: true});
        }
        resolve(constantRoutes)
      })
    })
  }
}

const sortMenuList = (menuList) => {
  console
  let baseMenu = []
  baseMenu = menuList.map(item => {
    let routerName = item.authority_url.replace("/", "")
    let routerItem = asyncRoutes[routerName]
    if (routerItem) {
      routerItem.id = item.authority_id
      routerItem.pid = item.parent_id
      routerItem.sort = item.authority_sort
      routerItem.meta.title = item.authority_name
      if (item.parent_id === "0") {
        routerItem.alwaysShow = true
      } else {
        routerItem.hidden = true
      }
      return routerItem
    } 
  })
  
  // 过滤数组
  baseMenu = baseMenu.filter(item => item!=undefined)
  constantRoutes = getTreeArr({ key: 'id', pKey: 'pid', data: baseMenu, jsonData: false })
}
// 调整路由
const getTreeArr = (obj) => {
  console.log(obj.data)
  if (!Array.isArray(obj.data)) {
    console.log('getTreeArr=>请传入数组')
    return []
  }
  let baseMenu = obj.data.filter(item => { return (item.pid === "0") })
  let menuList = obj.data.filter(item => { return !(item.pid === "0") })
  baseMenu.forEach(item => {
    item.children = []
    menuList.forEach(item1 =>{
      if(item[obj.key] == item1[obj.pKey]){
        item.children.push(item1)
      }
    })
    // 如果有二级菜单就进行排序，如果没有删除children属性
    if (item.children.length > 1) {
      item.children.sort((a, b) => a.sort - b.sort)
    }
    if (item.children.length === 0) {
      delete item.children
    }
    
  })
  baseMenu.sort((a, b) => a.sort - b.sort)
  return baseMenu
 }
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
