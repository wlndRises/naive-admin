import qs from 'qs'

export function getUrlQuery(url) {
  return qs.parse(url.split('?')[1])
}

export function setUrlQuery(url, obj) {
  const query = qs.stringify(obj)
  return /\?$/.test(url) ? url + query : url.replace(/\/?$/, '?') + query
}
