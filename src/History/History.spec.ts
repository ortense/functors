import { describe, it, expect } from 'vitest'
import { History, history } from './History'

describe('History', () => {
  it('should be defined', () => {
    expect(History).toBeDefined()
  })

  describe('.create', () => {
    it('should create a History instance', () => {
      const hs = History.create(Math.random)
      expect(hs).toBeInstanceOf(History)
    })
  })

  describe('.of', () => {
    it('should create a History instance', () => {
      const hs = History.of(Math.random)
      expect(hs).toBeInstanceOf(History)
    })
  })

  describe('history function', () => {
    it('should create a History instance', () => {
      const hs = history(Math.random)
      expect(hs).toBeInstanceOf(History)
    })
  })
  
  describe('Instance methods', () => {
    describe('.map', () => {
      it('should add new values using the map method', () => {
        const hs = History.of(10)
          .map(value => value + 5)
          .map(value => value * 2)
      
        expect(hs.current()).toBe(30)
      })
    })

    describe('.reset', () => {
      it('should reset the history to its initial value', () => {
        const hs = History.of(10)
          .map(value => value + 5)
          .map(value => value * 2)

        const resetHistory = hs.reset()
        expect(resetHistory.current()).toBe(10)
      })
    })

    describe('.rollback', () => {
      it('should rollback to a previous value', () => {
        const hs = History.of(10)
          .map(value => value + 5)
          .map(value => value * 2)
        const rolledBack = hs.rollback()

        expect(hs.current()).toBe(30)
        expect(rolledBack.current()).toBe(15)
      })

      it('should rollback received step number', () => {
        const increment = (x: number) => x + 1

        const hs = History.of(0)
          .map(increment)
          .map(increment)
          .map(increment)
          .map(increment)
        
        expect(hs.rollback(3).current()).toBe(1)
      })

      it('should rollback to initial value if steps exceed history length', () => {
        const hs = History.create(10)
        const rolledBack = hs.rollback(2)
        expect(rolledBack.current()).toBe(10)
      })
    })
  })
})
