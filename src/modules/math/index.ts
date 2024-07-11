export const sqr = (x: number) => x * x

export const clamp = (min: number, value: number, max: number) =>
  Math.max(min, Math.min(max, value))

export const normalize = (start: number, end: number, value: number) =>
  (value - start) / (end - start)

export const narrow = (start: number, end: number, value: number) =>
  clamp(0, normalize(start, end, value), 1)

export const random = (min: number, max: number, float: boolean = true) =>
  float
    ? Math.random() * (max - min) + min
    : Math.floor(Math.random() * (max - min + 1)) + min

export const throttle = (fn: () => void, threshold: number = 100) => {
  let last: number
  let timer: number
  return () => {
    const now = Date.now()
    const timePassed = !!last && now < last + threshold
    if (timePassed) {
      clearTimeout(timer)
      timer = window.setTimeout(() => {
        last = now
        fn()
      }, threshold)
    } else {
      last = now
      fn()
    }
  }
}

// Todo:
// constrain
// map
