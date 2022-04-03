const i = (...params: unknown[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...params)
  }
}

const e = (...params: unknown[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(...params)
  }
}

export default {
  i, e
}
