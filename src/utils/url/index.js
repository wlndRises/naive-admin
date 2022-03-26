import qs from 'qs'

export const getUrlQuery = (url) => {
  return qs.parse(url.split('?')[1])
}

export function setUrlQuery(url, obj) {
  const parameters = qs.stringify(obj)
  return /\?$/.test(url)
    ? url + parameters
    : url.replace(/\/?$/, '?') + parameters
}
