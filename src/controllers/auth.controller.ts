import { Request, Response } from 'express'
import { AUTH_SECRET } from '../utils/config'
import { User } from '../models/'
import Jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const signup = async (req: Request, res: Response) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    })

    if (!user) {
      return res.status(500).send({ message: 'User was not registered.' })
    }

    return res.send({ message: 'User was registered successfully!' })
  } catch (error) {
    return res.status(500).send({ message: 'User was not registered. ' + error })
  }
}

const signin = async (req: Request, res: Response) => {
  try {
    const body = req.body

    const user = await User.findOne({
      where: {
        email: body.email
      }
    })

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' })
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    )

    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Invalid Password!'
      })
    }

    const token = Jwt.sign({ id: user.id }, AUTH_SECRET, {
      expiresIn: 31556952 // 1 year
    })

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token
    })
  } catch (error) {
    return res.status(404).send({ message: 'User Not found.' })
  }
}

const controller = { signin, signup }

export default controller
