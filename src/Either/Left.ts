import { Either } from './Either.ts'

/**
 * Represents the left side of an Either type.
 * @class Left
 * @implements {Either}
 * @template L - The type of the left side.
 * @template R - The type of the right side.
 */
export class Left<L, R> implements Either<L, R> {
  /**
   * Private constructor to create an instance of `Left`.
   * @private
   * @constructor
   * @param {L} val - The value on the left side.
   */
  private constructor(private val: L) {}

  /**
   * Static method to create an instance of Left.
   * @param {L} value - The value on the left side.
   * @returns {Left} An instance of Left.
   */
  static create<L, R>(value: L) {
    return new Left<L, R>(value);
  }

  left<T>(fn: (value: L) => T): Either<T, R> {
    return new Left<T, R>(fn(this.val));
  }

  right<T>(fn: (value: R) => T): Either<L, T> {
    return this as unknown as Either<L, T>;
  }

  isLeft() {
    return true;
  }

  isRight() {
    return false;
  }

  unwrap() {
    return this.val;
  }
}

export function left<L, R>(value: L): Either<L, R> {
  return Left.create<L, R>(value)
}
