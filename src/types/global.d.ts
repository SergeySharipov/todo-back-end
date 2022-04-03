export interface ITaskCreation {
  id: number
  userId: number
  categoryId: number
  title: string
  description: string
  status: boolean
}

export interface ICategoryCreation {
  id: number
  userId: number
  title: string
}

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}
