/**
 * Represents a type that can be either of type L or R.
 * @interface Either
 * @template L The type of the left side.
 * @template R The type of the right side.
 */
export interface Either<L, R> {
  /**
   * Applies a function to the value inside the Either instance **if it is on the left side**, returning a new Either instance containing the result of the function. If the Either is on the right side, it returns itself.
   * @param {(value: L) => T} fn - A function to transform the value on the left side.
   * @returns {Either} An Either instance representing the transformed left side.
   */
  left<T>(fn: (value: L) => T): Either<T, R>

  /**
   * Applies a function to the value inside the Either instance **if it is on the right side**, returning a new Either instance containing the result of the function. If the Either is on the left side, it returns itself.
   * @param {(value: L) => T} fn - A function to transform the value on the right side.
   * @returns {Either} An Either instance representing the transformed right side.
   */
  right<T>(fn: (value: R) => T): Either<L, T>

  /**
   * Checks if the Either instance is on the left side.
   * @returns {boolean} True if the instance is on the left side, otherwise false.
   */
  isLeft(): boolean

  /**
   * Checks if the Either instance is on the right side.
   * @returns {boolean} True if the instance is on the right side, otherwise false.
   */
  isRight(): boolean

  /**
   * Unwraps the value contained in the Either instance.
   * @returns {L | R} The value contained in the Either instance.
   */
  unwrap(): L | R
}
