import supertest from 'supertest'
import app from '../index'
import { promises as fsPromises } from 'fs'

const request = supertest(app)
describe('Test endpoint responses', () => {
    it('get the api/images endpoint', async () => {
        const response = await request.get('/api/images')
        expect(response.status).toBe(400)
    })

    it('get the api/images?filename=fjord&height=200&width=200 endpoint', async () => {
        const response = await request.get(
            '/api/images?filename=fjord&height=200&width=200'
        )
        expect(response.status).toBe(200)
    })

    it('get the api/images?filename=fjord&height=0&width=0 endpoint', async () => {
        const response = await request.get(
            '/api/images?filename=fjord&height=0&width=0'
        )
        expect(response.text).toBe('Error: Sharp could not process the image')
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
