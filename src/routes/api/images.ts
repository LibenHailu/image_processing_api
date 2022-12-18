import express from 'express'
import { resize, getFile, getCache } from '../../utilities/images'

const images = express.Router()

const middle = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    const filename = req.query.filename as string
    const width = Number(req.query.width)
    const height = Number(req.query.height)

    try {
        // checks if the requested image exists
        await getFile(filename)
        // checks if an image was cached before
        const cacheExists = await getCache(filename, width, height)
        // sends an image if the requested image is in the cache and has the requested meta
        if (cacheExists) {
            // serve image form the cache if it was already proceesed
            res.sendFile(`${filename}_thumb.jpg`, {
                root: './images/thumb/',
            })
        } else {
            next()
        }
    } catch (err) {
        res.status(400)
        res.send(err)
    }
}

images.get('/', middle, async (req, res) => {
    try {
        const filename = req.query.filename as string
        const width = Number(req.query.width)
        const height = Number(req.query.height)

        await resize(filename, width, height)
        // await saveBuffer(filename, buf)

        res.sendFile(`${req.query.filename}_thumb.jpg`, {
            root: './images/thumb/',
        })
    } catch (err) {
        res.status(400)
        res.send(err)
    }
})

export default images
