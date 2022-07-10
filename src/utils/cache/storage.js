// TODO Implement encryption and decryption
export function createStorage(storage) {
  const prefixKey = 'naive'

  class Storage {
    static localInstance
    static sessionInstance

    constructor() {}

    static getInstance() {
      if (storage === localStorage) {
        if (!this.localInstance) {
          this.localInstance = new Storage()
        }
        return this.localInstance
      }
      if (storage === sessionStorage) {
        if (!this.sessionInstance) {
          this.sessionInstance = new Storage()
        }
        return this.sessionInstance
      }
    }

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
      const _data = storage.getItem(_key)

      return this._getOutputData(_data)
    }

    // 特殊处理key
    _getKey(key) {
      return `__${prefixKey}_${key}__`
    }

    _remove(_key) {
      storage.removeItem(_key)
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

    get(key, def = null) {
      const _key = this._getKey(key)
      const _data = this._getData(_key)

      if (!_data) {
        return def
      }

      const isExpired = this._isExpired(_key)
      const isOnce = this._isOnce(_key)

      // 删除已过期或者只读取一次的_key
      if (isExpired || isOnce) {
        this._remove(_key)
      }

      return isExpired ? def : _data.data
    }

    set(key, data, options = {}) {
      // options: { expires, isOnce }
      // expires 过期时间 单位: 小时
      // isOnce 是否只读取一次
      const _key = this._getKey(key)
      const _data = this._getInputData(data, options)

      storage.setItem(_key, _data)
    }

    remove(key) {
      const _key = this._getKey(key)

      this._remove(_key)
    }

    each(callback) {
      for (let i = storage.length - 1; i >= 0; i--) {
        let key = storage.key(i)
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

      storage.setItem(_key, _data)
    }

    clearAll() {
      return storage.clear()
    }
  }

  return Storage.getInstance()
}
