import http from './request'
export function getRequest(url, data = {}) {
  return http.get(url, { params: data })
}
export function postBodyRequest(url, data = {}) {
  return http.post(url, data)
}

export function postParamsRequest(url, params = {}) {
  return http.post(
    url,
    {},
    {
      params,
    }
  )
}
