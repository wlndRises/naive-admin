class Storage {
  constructor() {}

  // 存数据前处理
  _getInputData(data, options) {
    const _data = {
      data,
      keyInfo: Object.assign(options, {
        timestamp: new Date().getTime(),
      }),
    }

    return JSON.stringify(_data)
  }

  // 取数据后处理
  _getOutputData(data) {
    const _data = JSON.parse(data)

    return _data
  }

  // 获取_key的数据 => { data, keyInfo }
  _getData(_key) {
    const _data = localStorage.getItem(_key)

    return this._getOutputData(_data)
  }

  // 特殊处理key
  _getKey(key) {
    return `_naive_cli_${key}__`
  }

  _remove(_key) {
    localStorage.removeItem(_key)
  }

  // 是否过期
  _isExpired(_key) {
    const { keyInfo } = this._getData(_key)
    const { expires, timestamp } = keyInfo

    // 没有设置过期时间
    if (!expires) {
      return false
    }

    return timestamp + expires * 24 * 3600 * 1000 - new Date().getTime() < 0
  }

  // 是否只读取一次
  _isOnce(_key) {
    const { keyInfo } = this._getData(_key)
    const { isOnce } = keyInfo

    return !!isOnce
  }

  get(key) {
    const _key = this._getKey(key)
    const _data = this._getData(_key)

    if (!_data) {
      return null
    }

    const isExpired = this._isExpired(_key)
    const isOnce = this._isOnce(_key)

    // 删除已过期或者只读取一次的_key
    if (isExpired || isOnce) {
      this._remove(_key)
    }

    return isExpired ? null : _data.data
  }

  set(key, data, options = {}) {
    const _key = this._getKey(key)
    const _data = this._getInputData(data, options)

    localStorage.setItem(_key, _data)
  }

  remove(key) {
    const _key = this._getKey(key)

    this._remove(_key)
  }

  each(callback) {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      let key = localStorage.key(i)
      callback(key, this.get(key))
    }
  }

  // 写入一个读取一次后删除的key
  once(key, data, options = {}) {
    const _key = this._getKey(key)
    const _data = this._getInputData(
      data,
      Object.assign(options, {
        isOnce: true,
      })
    )

    localStorage.setItem(_key, _data)
  }

  clearAll() {
    return localStorage.clear()
  }
}

export default new Storage()
