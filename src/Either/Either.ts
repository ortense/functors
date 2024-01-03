/**
 * Represents a type that can be either of type L or R.
 * @interface Either
 * @template L The type of the left side.
 * @template R The type of the right side.
 * @example Use Either to handle erros
 * ```ts
 * import { Either, left, right } from '@ortense/functors'
 *
 * const divide = (
 *   numerator: number,
 *   denominator: number,
 * ): Either<Error, number> => {
 *   if (Number.isNaN(numerator)) {
 *     return left(new Error('Numerator is not a number.'))
 *   }
 *   if (Number.isNaN(denominator)) {
 *     return left(new Error('Denominator is not a number.'))
 *   }
 *
 *   if (denominator === 0) {
 *     return left(new Error('Division by zero is not posible.'))
 *   }
 *
 *   return right(numerator / denominator)
 * }
 * ```
 * @example capture correct side value
 * ```ts
 * const numerator = Number(document.querySelector('input#numerator').value)
 * const denominator = Number(document.querySelector('input#denominator').value)
 * const display = document.querySelector('div#display-result')
 * const onSuccess = (result: number) => {
 *  display.textContent = `${numerator} / ${denominator} = ${result}`
 * }
 * const onError = (error: Error) => {
 *   display.textContent = error.message
 * }
 *
 * divide(numerator, denominator)
 *   .right(onSuccess)
 *   .left(onError)
 * ```
 * @example type-safe error handler
 * ```ts
 * app.post('/users', async (req, res) => {
 *   const result: Either<Error, User> = await createUser(req.body)
 *   result
 *     .right(user => ({ id: user.id, name: user.name }))
 *     .right(responseBody => res.status(201).json(responseBody))
 *     .left(error => ({ error: error.name, message: error.message }))
 *     .left(responseBody => res.status(400).json(responseBody))
 * })
 * ```
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
