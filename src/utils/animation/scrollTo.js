import { requestAnimationFrame } from './requestAnimationFrame'

/**
 * @param {number} end
 * @param {number} duration
 * @param {Function} callback
 */
export function scrollTo(end, duration = 500, callback) {
  const { documentElement, body } = document
  const start = documentElement.scrollTop || body.parentNode.scrollTop || body.scrollTop
  const change = end - start
  const increment = 20
  let currentTime = 0
  const move = amount => {
    documentElement.scrollTop = amount
    body.parentNode.scrollTop = amount
    body.scrollTop = amount
  }
  animateScroll()
  function animateScroll() {
    // increment the time
    currentTime += increment
    // find the value with the quadratic in-out easing function
    const val = easeInOutQuad(currentTime, start, change, duration)
    // move the document.body
    move(val)
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll)
    } else {
      callback()
    }
  }
}

function easeInOutQuad(t, b, c, d) {
  t /= d / 2
  if (t < 1) {
    return (c / 2) * t * t + b
  }
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}
