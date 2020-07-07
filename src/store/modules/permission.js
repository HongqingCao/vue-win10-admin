import asyncRoutes from '@/router/asyncRoutes'
import { getAuthList } from "@/api/systemSetting"
let constantRoutes = []

// let modelRouter = [
//   {
//     desc: "仪表盘",
//     authority_id: 1,
//     authority_name: "仪表盘",
//     parent_id: 0,
//     parent_name: "",
//     authority_sort: 1,
//     authority_type: 0,
//     authority_url: "dashboard",
//     create_date: "2019-07-14T16:34:22.000Z",
//     create_timestamp: "1563122062",
//     flag: 1,
//     id: 1
//   },
//   {
//     desc: "平台管理",
//     authority_id: 2,
//     authority_name: "平台管理",
//     parent_id: 0,
//     parent_name: "",
//     authority_sort: 2,
//     authority_type: 0,
//     authority_url: "config",
//     create_date: "2019-07-14T16:34:22.000Z",
//     create_timestamp: "1563122062",
//     flag: 1,
//     id: 2
//   },
//   {
//     desc: "系统设置",
//     authority_id: 3,
//     authority_name: "系统设置",
//     parent_id: 0,
//     parent_name: "",
//     authority_sort: 3,
//     authority_type: 0,
//     authority_url: "systemSetting",
//     create_date: "2019-07-14T16:34:22.000Z",
//     create_timestamp: "1563122062",
//     flag: 1,
//     id: 3
//   },
//   {
//     desc: "权限设置",
//     authority_id: 4,
//     authority_name: "权限设置",
//     parent_id: 3,
//     parent_name: "",
//     authority_sort: 0,
//     authority_type: 0,
//     authority_url: "authority",
//     create_date: "2019-07-14T16:34:22.000Z",
//     create_timestamp: "1563122062",
//     flag: 1,
//     id: 4
//   },
//   {
//     desc: "角色管理",
//     authority_id: 5,
//     authority_name: "角色管理",
//     parent_id: 3,
//     parent_name: "",
//     authority_sort: 1,
//     authority_type: 0,
//     authority_url: "role",
//     create_date: "2019-07-14T16:34:22.000Z",
//     create_timestamp: "1563122062",
//     flag: 1,
//     id: 5
//   },
//   {
//     desc: "系统日志",
//     authority_id: 6,
//     authority_name: "系统日志",
//     parent_id: 3,
//     parent_name: "",
//     authority_sort: 2,
//     authority_type: 0,
//     authority_url: "log",
//     create_date: "2019-07-14T16:34:22.000Z",
//     create_timestamp: "1563122062",
//     flag: 1,
//     id: 6
//   }
// ]
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = routes
  }
}

const actions = {
  getMenuRouterList({ commit }) {
    return new Promise(resolve => {
      getAuthList({type:0}).then(res => {
        if (res.code === 20000 && res.data) {
          //本地路由测试
          //sortMenuList(modelRouter)
          sortMenuList(res.data)
          commit('SET_ROUTES', constantRoutes)
        } else {
          constantRoutes.push({path: '*', redirect: '/404', hidden: true});
        }
        console.log("222")
        console.log(constantRoutes)
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
