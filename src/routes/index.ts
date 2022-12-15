import images from './api/images'
import express from 'express'
const routes = express.Router()

routes.use('/images', images)

export default routes
