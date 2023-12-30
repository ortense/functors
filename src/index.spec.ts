import {describe, it, expect } from 'vitest'
import { add } from './index'

describe('example', () => {
  it('should pass', () => {
    expect(add(1, 2)).toBe(3)
  })
})
