import sharp from 'sharp'
import { promises as fsPromises } from 'fs'
sharp.cache(false)

// resize processes the image given height and width
export const resize = async (
    filename: string,
    width: number,
    height: number
): Promise<void> => {
    // process an image using sharp library
    try {
        await sharp(`./images/full/${filename}.jpg`)
            .resize({
                width: width,
                height: height,
            })
            .toFormat('jpg')
            .toFile(`./images/thumb/${filename}_thumb.jpg`)
    } catch (error) {
        throw 'Error: Sharp could not process the image'
    }
}

// getFile checks if a file exists or not
export const getFile = async (filename: string): Promise<string> => {
    const path = `./images/full/${filename}.jpg`
    const fileExists = await fsPromises
        .stat(path)
        .then(() => true)
        .catch(() => false)
    return new Promise<string>((resolve, reject) => {
        if (!fileExists) {
            reject('Error: can not find the file requested')
        }
        resolve('')
    })
}

// getFile checks if a cache exists or not
export const getCache = async (
    filename: string,
    width: number,
    height: number
): Promise<boolean> => {
    const cache_path = `./images/thumb/${filename}_thumb.jpg`
    const cacheExists = await fsPromises
        .stat(cache_path)
        .then(() => true)
        .catch(() => false)

    if (!cacheExists) {
        return false
    }

    const meta = await sharp(`./images/thumb/${filename}_thumb.jpg`).metadata()

    const isCached = meta.width == width && meta.height == height

    return new Promise<boolean>((resolve) => {
        if (isCached) {
            resolve(true)
        } else {
            resolve(false)
        }
    })
}
