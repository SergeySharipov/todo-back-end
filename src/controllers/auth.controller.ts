import { Request, Response } from 'express'
import { AUTH_SECRET } from '../utils/config'
import { User } from '../models/'
import Jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import zod from 'zod'
import * as Sequelize from 'sequelize'
import status from '../constants/status.constants'

const signupUserValidation = zod.object({
  username: zod.string({
    required_error: 'username can\'t be empty',
    invalid_type_error: 'username must be a string'
  }).min(1, { message: 'username can\'t be empty' }),
  email: zod.string({
    required_error: 'email can\'t be empty',
    invalid_type_error: 'email must be a string'
  }).email({ message: 'email is invalid' }),
  password: zod.string({
    required_error: 'password can\'t be empty',
    invalid_type_error: 'password must be a string'
  }).min(6, { message: 'password must be 6 or more characters long' })
})

const signinUserValidation = signupUserValidation.omit({ username: true })

const generateToken = (userId: number) => {
  return Jwt.sign({ id: userId }, AUTH_SECRET, {
    expiresIn: 31556952 // 1 year
  })
}

const signup = async (req: Request, res: Response) => {
  try {
    const validUser = signupUserValidation.parse(req.body)

    const user = await User.create({
      ...validUser,
      password: bcrypt.hashSync(validUser.password, 8)
    })

    if (!user) {
      return res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'User was not registered.' })
    }

    const token = generateToken(user.id)

    return res.status(status.OK).send({
      message: 'User was registered successfully!',
      accessToken: token
    })
  } catch (err: unknown) {
    if (err instanceof zod.ZodError) {
      res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Error: ' + err.errors.map(m => m.message) })
    } else if (err instanceof Sequelize.UniqueConstraintError) {
      res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Email is already registered.' })
    } else {
      res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'User was not registered. Error: ' + err })
    }
  }
}

const signin = async (req: Request, res: Response) => {
  try {
    const validUser = signinUserValidation.parse(req.body)

    const user = await User.findOne({
      where: {
        email: validUser.email
      }
    })

    if (!user) {
      return res.status(status.NOT_FOUND).send({ message: 'User Not found.' })
    }

    const passwordIsValid = bcrypt.compareSync(
      validUser.password,
      user.password
    )

    if (!passwordIsValid) {
      return res.status(status.UNAUTHORIZED).send({
        message: 'Invalid Password!'
      })
    }

    const token = generateToken(user.id)

    return res.status(status.OK).send({
      accessToken: token
    })
  } catch (err: unknown) {
    if (err instanceof zod.ZodError) {
      res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Error: ' + err.errors.map(m => m.message) })
    } else {
      res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Error: ' + err })
    }
  }
}

const controller = { signin, signup }

export default controller
