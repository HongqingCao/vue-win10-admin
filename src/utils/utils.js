/**
 * @description 全局去前后空格
 * @param data
 * @returns {string}
 */
export function dataTrim (data) {
  if (Array.isArray(data)) {
    for (let item of data) {
      if (typeof item === 'object') {
        dataTrim(item)
      } else if (typeof item === 'string') {
        item = item.trim()
      }
    }
  } else if (typeof data === 'object') {
    for (const key in data) {
      if (typeof data[key] === 'object') {
        dataTrim(data[key])
      } else if (typeof data[key] === 'string') {
        data[key] = data[key].trim()
      }
    }
  }
  return data
}