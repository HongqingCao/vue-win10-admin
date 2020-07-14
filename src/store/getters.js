const getters = {
  getScreenWidth: state => state.app.screenWidth,
  getScreenHeight: state => state.app.screenHeight,
  showMenu: state => state.app.showMenu,
  showMessage: state => state.app.showMessage,
  showUnfold: state => state.app.showUnfold,
  winSize: state => state.app.winSize,
  winArr: state => state.app.winArr,
  nowWin: state => state.app.nowWin,
  navTitle: state => state.app.navTitle,
  getZIndex: state => state.app.maxZIndexValue,
  getProcessCount: state => state.app.processCount,
  getTaskbarDirection: state => state.app.taskbarDirection,
  
  token: state => state.user.token,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,

  routers: state => state.permission.routes,
}
export default getters