/**
 * eg:
 * let [err, res] = await errorCaptured(asyncFunc)
 * if (err) {
 *   ... 错误捕获
 * }
 * ... 其他逻辑
 */
export const errorCaptured = async asyncFunc => {
  try {
    const res = await asyncFunc()
    return [null, res]
  } catch (err) {
    return [err, null]
  }
}

// 如果你想在出现错误时什么也不做 那么你可以
// const res = await asyncFunc().catch(noop)
// if (!res) return
