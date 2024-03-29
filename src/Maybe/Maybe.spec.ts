import { describe, it, expect, vitest } from 'vitest'
import { Maybe, maybe } from './Maybe'

describe('Maybe', () => {
  it('should be defined', () => {
    expect(Maybe).toBeDefined()
  })

  describe('.create', () => {
    it('should create a Maybe instance', () => {
      const maybeStr = Maybe.create('val')
      expect(maybeStr).toBeInstanceOf(Maybe)
    })
  })

  describe('maybe function', () => {
    it('should create a Maybe instance', () => {
      const maybeStr = maybe('val')
      expect(maybeStr).toBeInstanceOf(Maybe)
    })
  })

  describe('Instance methods', () => {
    describe('.map', () => {
      it('should call mapper function with populated value', () => {
        const value = ['value']
        const maybeVal = Maybe.create(value)
        const fn = vitest.fn()
        maybeVal.map(fn)
        expect(fn).toHaveBeenCalledWith(value)
      })

      it('should not call mapper function with empty value', () => {
        const maybeEmpty = Maybe.create<string[]>(null)
        const fn = vitest.fn()
        maybeEmpty.map(fn)
        expect(fn).not.toHaveBeenCalled()
      })
    })

    describe('.mapEmpty', () => {
      it('should call mapper function when empty', () => {
        const maybeEmpty = Maybe.create<string[]>(null)
        const fn = vitest.fn()
        maybeEmpty.mapEmpty(fn)
        expect(fn).toHaveBeenCalled()
      })

      it('should not call mapper function when populated', () => {
        const maybeVal = Maybe.create(['value'])
        const fn = vitest.fn()
        maybeVal.mapEmpty(fn)
        expect(fn).not.toHaveBeenCalled()
      })
    })

    describe('.unwrap', () => {
      it('should return wrapped value', () => {
        const value = { foo: 'bar' }
        const maybeVal = Maybe.create(value)
        expect(maybeVal.unwrap()).toBe(value)
      })
    })

    describe('.flat', () => {
      it('should flatten a Maybe with nested Maybe', () => {
        const nestedMaybe = maybe(maybe('nested value'))
        const flattenedMaybe = nestedMaybe.flat()
        expect(flattenedMaybe.unwrap()).toBe('nested value')
      })

      it('should not modify a Maybe with non-nested value', () => {
        const maybeStr = maybe('non-nested value')
        const flattenedMaybe = maybeStr.flat()
        expect(flattenedMaybe.unwrap()).toBe('non-nested value')
      })
    })

    describe('.flatMap', () => {
      it('should apply mapping function and flatten the result', () => {
        const maybeVal = maybe('value')
        const fn = (val: string) => maybe(val.toUpperCase())
        const resultMaybe = maybeVal.flatMap(fn)
        expect(resultMaybe.unwrap()).toBe('VALUE')
      })

      it('should apply function to nested value', () => {
        const maybeStr = maybe(maybe('nested value'))
        const fn = (val: string) => val.toUpperCase()
        const resultMaybe = maybeStr.flatMap(fn)
        expect(resultMaybe.unwrap()).toBe('NESTED VALUE')
      })
    })
  })
})
