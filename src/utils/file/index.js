import { base64ToBlob, urlToBase64 } from './base64Conver'

/**
 * @description: 在线Url下载 存在跨域问题时 先解决跨域
 */
export function downloadByOnlineUrl(url, filename, mime, bom) {
  urlToBase64(url).then(base64 => {
    downloadByBase64(base64, filename, mime, bom)
  })
}

/**
 * @description: 下载基于base64的图片
 */
export function downloadByBase64(buf, filename, mime, bom) {
  const base64Buf = base64ToBlob(buf)
  downloadByBlob(base64Buf, filename, mime, bom)
}

/**
 * @description: 根据后台界面文件流下载
 */
export function downloadByBlob(data, filename, mime, bom) {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' })

  // 返回一个 DOMString 表示指定的 File 对象或 Blob 对象的URL
  // 这个 URL 的生命周期和创建它的窗口中的 document 绑定
  // 可以提前使用 URL.revokeObjectURL 解绑
  const blobURL = window.URL.createObjectURL(blob)
  downloadByUrl(blobURL, filename, '_self')
  window.URL.revokeObjectURL(blobURL)
}

/**
 * @description: 根据文件地址下载或预览文件
 */
export function downloadByUrl(url, filename, target = '_blank') {
  const link = document.createElement('a')
  link.href = url
  link.target = target
  link.download = filename || url.substring(url.lastIndexOf('/') + 1, url.length)
  link.click()
}
