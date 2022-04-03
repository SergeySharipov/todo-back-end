import 'dotenv/config'
import app from './app'
import http from 'http'
import { PORT } from './utils/config'
import log from './utils/log'

const server = http.createServer(app)

server.listen(PORT, () => {
  log.i(`Server running on port ${PORT}`)
})
