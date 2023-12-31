/**
 * Class representing a history of values.
 * @class History
 * @template T - The type of values in the history.
 * @example Create a new History instance with an initial value of 10.
 * ```
 * const history = History.create(10)
 * ```
 * @example Create a new History instance using the alias method.
 * ```
 * const historyOfValue = History.of(50)
 * ```
 * @example Add new values using the map method.
 * ```
 * const updatedHistory = history
 *   .map(value => value + 5)
 *   .map(value => value * 2)
 * ```
 * @example Get the current value from the updated history.
 * ```
 * const currentValue = updatedHistory.current() // output: 30
 * ```
 * @example Reset the history to its initial value.
 * ```
 * const resetHistory = updatedHistory.reset()
 * ```
 * @example Rollback to a previous value.
 * ```
 * const rolledBackHistory = resetHistory.rollback()
 * ```
 */
export class History<T> {
  /**
   * Private constructor to create an instance of `History`.
   * @private
   * @constructor
   * @param {T[]} history - The history of values.
   */
  private constructor(private history: T[]) {}

  /**
   * Create a new instance of `History` with an initial value.
   * @param {T} initial - The initial value.
   * @returns {History<T>} A new instance of `History`.
   */
  static create<T>(initial: T): History<T> {
    return new History([initial])
  }

  /**
   * Create a new instance of `History` with an initial value.
   * @alias History#create
   * @param {T} value - The initial value.
   * @returns {History<T>} A new instance of `History`.
   */
  static of<T>(value: T): History<T> {
    return History.create(value)
  }

  /**
   * Get the current value at the end of the history.
   * @returns {T} The current value.
   */
  current(): T {
    return this.history[this.history.length - 1]
  }

  /**
   * Apply a function to the current value and add the new value to the history.
   * @param {Function} fn - The function to be applied to the current value.
   * @returns {History<T>} A new instance of `History` with the updated value.
   */
  map(fn: (value: T) => T): History<T> {
    return new History([...this.history, fn(this.current())])
  }

  /**
   * Reset the history to contain only the initial value.
   * @returns {History<T>} A new instance of `History` with the history reset.
   */
  reset(): History<T> {
    return new History([this.history[0]])
  }

  /**
   * Revert the history to a previous value, removing the indicated number of values.
   * @param {number} steps - The number of values to revert. Default is 1.
   * @returns {History<T>} A new instance of `History` with the history reverted.
   */
  rollback(steps: number = 1): History<T> {
    if (steps >= this.history.length) {
      return this.reset()
    }

    return new History(this.history.slice(0, this.history.length - steps))
  }
}

export function history<T>(value: T): History<T> {
  return History.create(value)
}
