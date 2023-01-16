import app from './app.js'
import request from 'supertest'

describe("App tests", () => {
  test('Get homepage', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    expect(res.body.info).toBeDefined()
    expect(res.body.info).toBe('Journal API 2023')
  })

  describe('GET categories list', () => {
    let res

    beforeEach(async () => {
    res = await request(app).get('/categories')
    expect(res.status).toBe(200)
    // expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    // expect(res.headers['content-type']).toMatch(/json/)
    // i means case insensitive
    // expect(res.headers['content-type']).toMatch(/json/i)
    expect(res.headers['content-type']).toMatch(/application\/json/)
    })
    
    it('Should return an array of 4 elements', () => {
      expect(res.body).toBeInstanceOf(Array)
      expect(res.body.length).toBe(4)
    })
    
    it('Has an element with the correct data structure', () => {
      res.body.forEach(el => {
        expect(el._id).toBeDefined()
        expect(el.name).toBeDefined()
        expect(el._id.length).toBe(24)
      })
      expect(res.body[0].name).toBe('Work')
    })
  })

  test('Create a new entry', async () => {
    const res = await request(app).post('/entries').send({
      category: 'Work',
      content: 'Jest testing'
    })

    expect(res.status).toBe(201)
    expect(res.headers['content-type']).toMatch(/application\/json/)
    expect(res.body._id).toBeDefined()
    expect(res.body.content).toBeDefined()
    expect(res.body.category.name).toBeDefined()
    expect(res.body.category.name).toBe('Work')
    expect(res.body.content).toBe('Jest testing')
  })
})