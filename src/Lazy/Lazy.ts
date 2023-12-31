/**
 * Represents a lazy-evaluated value that is computed only when needed.
 * @class Lazy
 * @template T - The type of the value.
 * @example Usage of the Lazy
 * ```
 * // Create a Lazy instance that represents the computation of doubling a number.
 * const lazyDouble = Lazy.create(() => {
 *   console.log('Doubling...');
 *   return 21 * 2;
 * });
 *
 * // Evaluate the Lazy, triggering the computation.
 * const result1 = lazyDouble.evaluate(); // Output: Doubling...
 * console.log(result1); // Output: 42
 *
 * // Evaluate the Lazy again, but the computation is not triggered (value is cached).
 * const result2 = lazyDouble.evaluate();
 * console.log(result2); // Output: 42
 *
 * // Map the Lazy to triple the value.
 * const lazyTriple = lazyDouble.map(value => value * 3);
 *
 * // Evaluate the new Lazy, triggering the mapped computation.
 * 
 * const result3 = lazyTriple.evaluate(); // Output: Doubling...
 * console.log(result3); // Output: 126
 * ```
 * 
 * // Use async operations
 * const getUsers = fetch('https://jsonplaceholder.typicode.com/users')
 * const lazyMailList = lazyFetch(getUsers)
 *  .map(response => response.json())
 *  .map(users => users.map(user => user.email))
 * 
 * const result4 = await lazyMailList.evaluate()
 */
export class Lazy<T> {
  /**
   * Flag indicating whether the value has been evaluated.
   * @private
   * @type {boolean}
   */
  private evaluated = false

  /**
   * The computed value, stored after evaluation.
   * @private
   * @type {T | undefined}
   */
  private value?: T | Promise<T>

  /**
   * Private constructor to create an instance of `Lazy`.
   * @private
   * @constructor
   * @param {() => Promise<T> | T} computation - The function representing the lazy computation.
   */
  private constructor(private computation: () => Promise<T> | T) {}

  /**
   * Static method to create an instance of `Lazy`.
   * @template T - The type of the value.
   * @param {() => T | Promise<T>} computation - The function representing the lazy computation.
   * @returns {Lazy<T>} An instance of Lazy.
   */
  static create<T>(computation: () => Promise<T> | T): Lazy<T> {
    return new Lazy<T>(computation)
  }

  /**
   * Maps the computed value to a new value using the provided function.
   * @template R - The type of the result after applying the function.
   * @param {((input: T) => Promise<R>) | ((input: T) => R)} fn - The function to apply to the computed value.
   * @returns {Lazy<R>} A new instance of Lazy with the transformed value.
   */
  map<R>(fn: ((input: T) => Promise<R>) | ((input: T) => R)): Lazy<R> {
    return new Lazy<R>(() => {
      const result = this.computation()

      if(isPromise<T>(result)) {
        return result.then(fn)
      }

      return fn(result)
    })
  }

  /**
   * Evaluates and returns the computed value, calculating it only when necessary.
   * @returns {T} The computed value.
   */
  evaluate(): T | Promise<T> {
    if (this.evaluated) {
      return this.value as T | Promise<T>
    }

    this.evaluated = true
    this.value = this.computation()
    return this.value as T | Promise<T>
  }

  /**
   * Alias for `evaluate()`. Returns the computed value.
   * @alias Lazy#evaluate
   * @returns {T} The computed value.
   */
  unwrap(): T | Promise<T> {
    return this.evaluate()
  }
}

export function lazy<T>(computation: () => Promise<T> | T): Lazy<T> {
  return Lazy.create(computation)
}

function isPromise<T>(value: T | Promise<T>): value is Promise<T> {
  return value instanceof Promise
}
