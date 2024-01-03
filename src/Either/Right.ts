import { Either } from './Either'

/**
 * Represents the right side of an Either type.
 * @class Right
 * @implements {Either}
 * @template L - The type of the left side.
 * @template R - The type of the right side.
 */
export class Right<L, R> implements Either<L, R> {
  /**
   * Private constructor to create an instance of Right.
   * @private
   * @constructor
   * @param {R} val - The value on the right side.
   */
  private constructor(private val: R) {}

  /**
   * Static method to create an instance of Right.
   * @template L - The type of the left side.
   * @template R - The type of the right side.
   * @param {R} value - The value on the right side.
   * @returns {Either<L, R>} An instance of Right.
   */
  static create<L, R>(value: R): Either<L, R>  {
    return new Right<L, R>(value)
  }

  left<T>(fn: (value: L) => T): Either<T, R> {
    return this as unknown as Either<ReturnType<typeof fn>, R>
  }

  right<T>(fn: (value: R) => T): Either<L, T> {
    return new Right<L, T>(fn(this.val))
  }

  isLeft() {
    return false
  }

  isRight() {
    return true
  }

  unwrap() {
    return this.val
  }
}

export function right<L, R>(value: R): Either<L, R> {
  return Right.create<L, R>(value)
}
