const getters = {
  getScreenWidth: state => state.app.screenWidth,
  getScreenHeight: state => state.app.screenHeight,
  showMenu: state => state.app.showMenu,
  showMessage: state => state.app.showMessage,
  showUnfold: state => state.app.showUnfold,
  winSize: state => state.app.winSize,
  winArr: state => state.app.winArr,
  nowWin: state => state.app.nowWin,
  getZIndex: state => state.app.maxZIndexValue,
  getProcessCount: state => state.app.processCount,
  getTaskbarDirection: state => state.app.taskbarDirection
}
export default getters