/*
 * @Author: codercao
 * @Date: 2020-07-19 18:37:12
 * @LastEditors: codercao
 * @LastEditTime: 2020-07-19 18:41:48
 * @Description: 
 * @FilePath: \vue-win10-admin\src\utils\dispatchEventStroage.js
 */ 
export default function dispatchEventStroage () {
  const signSetItem = localStorage.setItem
  localStorage.setItem = function (key, val) {
    let setEvent = new Event('setItemEvent')
    setEvent.key = key
    setEvent.newValue = val
    window.dispatchEvent(setEvent)
    signSetItem.apply(this, arguments)
  }
}
