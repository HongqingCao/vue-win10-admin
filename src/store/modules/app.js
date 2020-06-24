const state = {
  screenWidth: window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth,
  screenHeight: window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight,
  maxZIndexValue: 25,
  processCount: 0,
  taskbarDirection: 'bottom',
  showMenu: false,
  showMessage: false,
  showUnfold: false, //开始展开
  winSize: {
    width: 0,
    height: 0
  },
  winArr: [],
  nowWin:'',
  navTitle:'',
  zIndex: 1001
}

const mutations = {
   TOGGLE_MENU: state => {
      state.showMessage = false;
      state.showMenu = !state.showMenu;
      if (!state.showMenu) {
        state.showUnfold = false;
      }
   },
   TOGGLE_MESSAGE: state => {
    state.showMenu = false;
    state.showUnfold = false;
    state.showMessage = !state.showMessage;
  },
  TOGGLE_UNFOLD: state => {
    state.showUnfold = !state.showUnfold;
  }, 
  CHANGE_WIN: (state, iconData) => {
    for (let i = 0; i < state.winArr.length; i++) {
      if (state.winArr[i].meta.title === iconData.meta.title) { 
        state.nowWin = iconData;
        return false;
      }
    }
    // 当前业务未打开，需要打开
    state.winArr.push(iconData);
    state.nowWin = iconData;
  },
  TOGGLE_WIN: (state, tagData) => {
    state.nowWin = tagData;
  },
  CHANGE_NAV: (state, data) => {
    state.navTitle = data;
  },
  DEL_WINDOW: (state, data) => {
    for (let i = 0; i < state.winArr.length; i++) {
      if (state.winArr[i].title === data.title) {
        state.winArr.splice(i, 1);
        if(i >= state.winArr.length) {
          state.nowWin = state.winArr[i - 1]
        } else {
          state.nowWin = state.winArr[i]
        }
        return false;
      }
    }
  },
  SET_ZINDEX:  (state, dom) => {
    for (let i = 0; i < state.winArr.length; i++) {
      if (state.winArr[i].name === dom.name) {
        state.winArr[i].zIndex = state.zIndex;
        state.zIndex++;
        state.winArr = JSON.parse(JSON.stringify(state.winArr));
        return false;
      }
    }
  }
}

const actions = {
  toggleMenu({ commit }) {
     commit('TOGGLE_MENU')
   },
  toggleMessage({ commit }) {
    commit('TOGGLE_MESSAGE')
  },
  toggleUnfold({ commit }) {
   commit('TOGGLE_UNFOLD')
  },
  setZIndex({ commit }, dom) {
  commit('SET_ZINDEX', dom)
 },
 changeWin({ commit }, iconData) {
  commit('CHANGE_WIN', iconData)
 },
 toggleWin({ commit }, tagData) {
  commit('TOGGLE_WIN', tagData)
 },
 delWindow({ commit }, data) {
  commit('DEL_WINDOW', data)
 },
 changeNavTitle({ commit }, data) {
  commit('CHANGE_NAV', data)
 },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}