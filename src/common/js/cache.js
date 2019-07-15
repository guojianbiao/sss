import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

// 存入搜索纪录
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

// 删除搜索纪录
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 保存搜索纪录
export function saveSearch(query) {
  let searchs = storage.get(SEARCH_KEY, [])
  insertArray(searchs, query, (item) => {
    console.log(item)
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searchs)
  return searchs
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

// 清空单个搜索纪录
export function deleteSearch(query) {
  let searchs = storage.get(SEARCH_KEY, [])
  deleteFromArray(searchs, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searchs)
  return searchs
}

// 清空所有搜索纪录
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}