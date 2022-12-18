import { resize, getFile, getCache } from '../utilities/images'
import { promises as fsPromises } from 'fs'

describe('Test resize image function', () => {
    it('expect resize not to throw error', async () => {
        const response = await resize('fjord', 200, 200)
        expect(response).toBeUndefined()
    })

    it('expect resize to throw error', async () => {
        await expectAsync(resize('fjord', 0, 0)).toBeRejectedWith(
            'Error: Sharp could not process the image'
        )
    })
})

describe('Test getFile  function', () => {
    it('expect getFile not to throw error', async () => {
        await expectAsync(getFile('fjord')).toBeResolvedTo('')
    })

    it('expect getFile to throw error', async () => {
        await expectAsync(getFile('')).toBeRejectedWith(
            'Error: can not find the file requested'
        )
    })
})

describe('Test getCache  function', () => {
    it('expect getCache not to throw error', async () => {
        await resize('fjord', 200, 200)
        await expectAsync(getCache('fjord', 200, 200)).toBeResolvedTo(true)
    })

    it('expect getCache to throw error', async () => {
        await resize('fjord', 200, 200)
        await expectAsync(getCache('fjord', 200, 100)).toBeResolvedTo(false)
    })
})

// clean up after the creating of image during the test
afterAll(async () => {
    try {
        await fsPromises.unlink(`./images/thumb/fjord_thumb.jpg`)
    } catch (err) {
        // console.log(err)
    }
})
