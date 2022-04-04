/* eslint-disable @typescript-eslint/no-non-null-assertion */
const PORT = process.env.PORT!

const DATABASE_URL = process.env.DATABASE_URL!

const AUTH_SECRET = process.env.AUTH_SECRET!

const NODE_ENV = process.env.NODE_ENV

export {
  AUTH_SECRET,
  DATABASE_URL,
  PORT,
  NODE_ENV
}
