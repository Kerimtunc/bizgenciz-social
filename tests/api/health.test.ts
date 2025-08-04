import { GET } from '../../app/api/health/route'

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      status: options?.status || 200,
      json: async () => data,
      headers: new Map(),
    })),
  },
}))

describe('Health API', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    jest.clearAllMocks()
  })

  it('returns 200 status with health information', async () => {
    const request = new Request('http://localhost:3000/api/health')
    
    const response = await GET(request)
    
    expect(response.status).toBe(200)
    
    const data = await response.json()
    expect(data).toHaveProperty('status')
    expect(data).toHaveProperty('timestamp')
    expect(data).toHaveProperty('version')
    expect(data.status).toBe('healthy')
  })

  it('includes required health check fields', async () => {
    const request = new Request('http://localhost:3000/api/health')
    
    const response = await GET(request)
    const data = await response.json()
    
    expect(data).toHaveProperty('database')
    expect(data).toHaveProperty('uptime')
    expect(data).toHaveProperty('environment')
  })

  it('returns correct response format', async () => {
    const request = new Request('http://localhost:3000/api/health')
    
    const response = await GET(request)
    const data = await response.json()
    
    // Check all required fields
    expect(data).toHaveProperty('status')
    expect(data).toHaveProperty('timestamp')
    expect(data).toHaveProperty('version')
    expect(data).toHaveProperty('environment')
    expect(data).toHaveProperty('database')
    expect(data).toHaveProperty('uptime')
    expect(data).toHaveProperty('memory')
    
    // Check data types
    expect(typeof data.status).toBe('string')
    expect(typeof data.timestamp).toBe('string')
    expect(typeof data.version).toBe('string')
    expect(typeof data.environment).toBe('string')
    expect(typeof data.database).toBe('string')
    expect(typeof data.uptime).toBe('number')
    expect(typeof data.memory).toBe('object')
  })
}) 