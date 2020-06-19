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
      if (state.winArr[i].title === iconData.title) { // 如果当前业务已打开，则前置显示
        // 当前窗口是否最小化
        let dom = document.querySelector(`[data-title=${iconData.title}]`);
        if (dom.style.display === 'none') {
          dom.style.display = 'block';
        }
        // 处理zIndex
        // state.winArr[i].zIndex = state.zIndex;
        // state.zIndex++;
        state.winArr = JSON.parse(JSON.stringify(state.winArr));
        return false;
      }
    }
    // 当前业务未打开，需要打开
    state.winArr.push({
      title: iconData.title,
      alt: iconData.icon,
    });
    state.nowWin = iconData;
    console.log(state.winArr)
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}