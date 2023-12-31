import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Lazy, lazy } from './Lazy'


beforeEach(() => {
  vi.clearAllMocks()
})

describe('Lazy', () => {
  it('should be defined', () => {
    expect(Lazy).toBeDefined()
  })

  describe('.create', () => {
    it('should create a Lazy instance', () => {
      const lz = Lazy.create(Math.random)
      expect(lz).toBeInstanceOf(Lazy)
    })
  })

  describe('lazy function', () => {
    it('should create a Lazy instance', () => {
      const lz = lazy(Math.random)
      expect(lz).toBeInstanceOf(Lazy)
    })
  })

  describe('Instance methods', () => {
    const init = () => '44fee407li841ng-la41zy3879'
    const removeNumbers = vi.fn((val: string) =>  val.replace(/\d/g, ''))
    const toUpperCase = vi.fn((val: string) =>  val.toUpperCase())

    describe('.map', () => {
      it('should not call mapping functions until evaluated', () => {
        const lz = lazy(init)
          .map(removeNumbers)
          .map(toUpperCase)

        expect(removeNumbers).not.toHaveBeenCalled()
        expect(toUpperCase).not.toHaveBeenCalled()

        lz.evaluate()

        expect(removeNumbers).toHaveBeenCalled()
        expect(toUpperCase).toHaveBeenCalled()
      })
    })

    describe('.evaluate', () => {
      it('should return computed value', () => {
        const lz = lazy(init)
          .map(removeNumbers)
          .map(toUpperCase)

        expect(lz.evaluate()).toBe('FEELING-LAZY')
      })

      it('should return computed value', () => {
        const lz = lazy(init)
          .map(removeNumbers)
          .map(toUpperCase)

        expect(lz.evaluate()).toBe('FEELING-LAZY')
      })

      it('should call mapping functions just one time', () => {
        const lz = lazy(init)
          .map(removeNumbers)
          .map(toUpperCase)

        expect(lz.evaluate()).toBe('FEELING-LAZY')
        expect(removeNumbers).toHaveBeenCalledTimes(1)
        expect(toUpperCase).toHaveBeenCalledTimes(1)
        expect(lz.evaluate()).toBe('FEELING-LAZY')
        expect(removeNumbers).toHaveBeenCalledTimes(1)
        expect(toUpperCase).toHaveBeenCalledTimes(1)
      })
    })

    describe('.unwrap', () => {
      it('should lazy evaluate', () => {
        const lz = lazy(init)
          .map(removeNumbers)
          .map(toUpperCase)

        vi.spyOn(lz, 'evaluate')

        expect(lz.unwrap()).toBe('FEELING-LAZY')
        expect(lz.evaluate).toHaveBeenCalled()
      })
    })
  })

  describe('async evaluation', () => {
    const data = {
      users: [
        { email: 'user1@email.com' },
        { email: 'user2@email.com' },
        { email: 'user3@email.com' },
      ],
    }

    const res = new Response(JSON.stringify(data))
    const mockFetch = () => Promise.resolve(res)

    it('should evaluate resolved values', async () => {
      const lz = lazy(mockFetch)
        .map(res => res.json() as Promise<typeof data>)
        .map(data => data.users)
        .map(users => users.map(u => u.email))

      const list = await lz.evaluate()

      expect(list).toEqual([
        'user1@email.com',
        'user2@email.com',
        'user3@email.com',
      ])
    })
  })
})
