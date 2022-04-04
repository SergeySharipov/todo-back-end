import { NODE_ENV } from './config'

const i = (...params: unknown[]) => {
  if (NODE_ENV === 'development') {
    console.log(...params)
  }
}

const e = (...params: unknown[]) => {
  if (NODE_ENV === 'development') {
    console.error(...params)
  }
}

export default {
  i, e
}
