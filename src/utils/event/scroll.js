export function addScrollListener(callback) {
  let beforeScrollTop = window.pageYOffset
  window.addScrollListener(() => {
    let direction = 'up'
    const afterScrollTop = window.pageYOffset
    const delta = afterScrollTop - beforeScrollTop
    if (delta === 0) {
      return false
    }
    direction = delta > 0 ? 'down' : 'up'
    callback(direction)
    beforeScrollTop = afterScrollTop
  })
}
