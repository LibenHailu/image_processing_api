import express from 'express'
import sharp from 'sharp'
import { promises as fsPromises } from 'fs'
sharp.cache(false)
const images = express.Router()

const middle = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    // checks if the requested image exists
    const path = `./images/full/${req.query.filename}.jpg`
    const fileExists = await fsPromises
        .stat(path)
        .then(() => true)
        .catch(() => false)

    // sends an error if file does not exit
    if (!fileExists) {
        // TODO: send an error
        return next(new Error('File does not exist'))
    }

    // checks if an image was cached before
    const cache_path = `./images/thumb/${req.query.filename}_thumb.jpg`
    const cacheExists = await fsPromises
        .stat(cache_path)
        .then(() => true)
        .catch(() => false)

    let sameMeta = false

    if (cacheExists) {
        const meta = await sharp(
            `./images/thumb/${req.query.filename}_thumb.jpg`
        ).metadata()
        sameMeta =
            meta.width == Number(req.query.width) &&
            meta.height == Number(req.query.height)
    }

    // sends an image if the requested image is in the cache and has the requested meta
    if (cacheExists && sameMeta) {
        // serve image form the cache if it was already proceesed
        return res.sendFile(`${req.query.filename}_thumb.jpg`, {
            root: './images/thumb/',
        })
    } else {
        return next()
    }
}

images.get('/', middle, async (req, res) => {
    try {
        // process an image using sharp library
        const buf = await sharp(`./images/full/${req.query.filename}.jpg`)
            .resize({
                height: Number(req.query.height),
                width: Number(req.query.width),
            })
            .toFormat('jpg')
            .toBuffer()
        // .toFile(`./images/thumb/${req.query.filename}_thumb.jpg`)

        await fsPromises.writeFile(
            `./images/thumb/${req.query.filename}_thumb.jpg`,
            buf
        )

        return res.sendFile(`${req.query.filename}_thumb.jpg`, {
            root: './images/thumb/',
        })
    } catch (err) {
        return err
    }
})

export default images
