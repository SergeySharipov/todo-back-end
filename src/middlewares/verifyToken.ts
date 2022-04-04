import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AUTH_SECRET } from '../utils/config'
import status from '../constants/status.constants'

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization

  if (!bearerHeader) {
    return res.status(403).send({ message: 'No token provided!' })
  }

  const bearer = bearerHeader.split(' ')
  const bearerToken = bearer[1]
  const token = bearerToken

  if (!token || typeof token !== 'string') {
    return res.status(403).send({ message: 'No token provided!' })
  }

  jwt.verify(token, AUTH_SECRET, (err, decoded) => {
    if (err || !decoded || typeof decoded === 'string') {
      return res.status(status.UNAUTHORIZED).send({ message: 'Unauthorized!' })
    }

    req.userId = decoded.id

    next()
  })
}

export default verifyToken
