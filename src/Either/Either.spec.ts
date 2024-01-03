import { expect, describe, it, vi } from 'vitest'
import { Either } from './Either'
import { Left, left } from './Left'
import { Right, right } from './Right'

describe('Either', () => {
  describe('Left', () => {
    it('should be defined', () => {
      expect(Left).toBeDefined()
    })

    describe('.create', () => {
      it('should create a Left instance', () => {
        const l = Left.create('val')
        expect(l).toBeInstanceOf(Left)
      })
    })

    describe('left function', () => {
      it('should create a Left instance', () => {
        const l = left('val')
        expect(l).toBeInstanceOf(Left)
      })
    })

    describe('Instance methods', () => {
      describe('.left', () => {
        it('should call mapper function', () => {
          const mapper = vi.fn()
          left('test').left(mapper)
          expect(mapper).toHaveBeenCalledWith('test')
        })
      })

      describe('.right', () => {
        it('should not call mapper function', () => {
          const mapper = vi.fn()
          left('test').right(mapper)
          expect(mapper).not.toHaveBeenCalled()
        })
      })

      describe('.isLeft', () => {
        it('should be true', () => {
          expect(left('test').isLeft()).toBe(true)
        })
      })

      describe('.isRight', () => {
        it('should be false', () => {
          expect(left('test').isRight()).toBe(false)
        })
      })

      describe('.unwrap', () => {
        it('should return wrapped value', () => {
          const value = { foo: 'bar' }
          const l = left(value)
          expect(l.unwrap()).toBe(value)
        })
      })
    })
  })

  describe('Right', () => {
    it('should be defined', () => {
      expect(Right).toBeDefined()
    })

    describe('.create', () => {
      it('should create a Right instance', () => {
        const r = Right.create('val')
        expect(r).toBeInstanceOf(Right)
      })
    })

    describe('right function', () => {
      it('should create a Right instance', () => {
        const r: Either<unknown, string> = right('val')
        expect(r).toBeInstanceOf(Right)
      })
    })

    describe('Instance methods', () => {
      describe('.left', () => {
        it('should not call mapper function', () => {
          const mapper = vi.fn()
          right('test').left(mapper)
          expect(mapper).not.toHaveBeenCalledWith()
        })
      })

      describe('.right', () => {
        it('should not call mapper function', () => {
          const mapper = vi.fn()
          const l: Either<unknown, string>  = right('test')
          l.right(mapper)
          expect(mapper).toHaveBeenCalledWith('test')
        })
      })

      describe('.isLeft', () => {
        it('should be false', () => {
          expect(right('test').isLeft()).toBe(false)
        })
      })

      describe('.isRight', () => {
        it('should be true', () => {
          expect(right('test').isRight()).toBe(true)
        })
      })

      describe('.unwrap', () => {
        it('should return wrapped value', () => {
          const value = { foo: 'bar' }
          const r = right(value)
          expect(r.unwrap()).toBe(value)
        })
      })
    })
  })
})
