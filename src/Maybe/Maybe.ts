/**
 * Obtains the wrapped type of a Maybe instance, if it exists.
 * otherwise, returns the original type.
 * @template T - The type of the Maybe instance.
 */
export type MaybeValueType<T> = T extends Maybe<infer U> ? U : T

/**
 * Represents a container that may or may not contain a value of type T.
 * @class Maybe
 * @template T - The type of the value.
 * @example Using maybe to check a environment variable
 * ```
 * const port = Maybe.create<string>(process.env.PORT)
 *   .map(value => Number(value))
 *   .map(value => Number.isNaN(value) ? 3000 : value)
 *   .mapEmpty(() => 3000)
 *   .unwrap()
 * ```
 */
export class Maybe<T> {
  /**
   * Private constructor to create an instance of Maybe.
   * @private
   * @constructor
   * @param {T | null | undefined} value - The value or absence of a value.
   */
  private constructor(private value: T | null | undefined) {}

  /**
   * Static method to create an instance of Maybe.
   * @template T - The type of the value.
   * @param {T | null | undefined} value - The value or absence of a value.
   * @returns {Maybe<T>} An instance of Maybe.
   */
  static create<T>(value: T | null | undefined): Maybe<T> {
    return new Maybe(value)
  }

  /**
   * Applies a function to the value inside the Maybe instance if it is present,
   * returning a new Maybe instance containing the result of the function.
   * If the Maybe instance is empty, it returns itself.
   * @template R - The type of the result.
   * @param {Function} fn - The function to apply to the value.
   * @returns {Maybe<R>} A new Maybe instance containing the result of the function.
   */
  map<R>(fn: (value: T) => R): Maybe<R> {
    if (this.value !== null && this.value !== undefined) {
      return new Maybe<R>(fn(this.value))
    }

    return this as unknown as Maybe<R>
  }

  /**
   * Applies a function to the value inside the Maybe instance if it is empty,
   * returning a new Maybe instance containing the result of the function.
   * If the Maybe instance is not empty, it returns itself.
   * @template R - The type of the result.
   * @param {Function} fn - The function to apply when the value is empty.
   * @returns {Maybe<R>} A new Maybe instance containing the result of the function.
   */
  mapEmpty<R>(fn: () => R): Maybe<R> {
    if (this.value === null || this.value === undefined) {
      return new Maybe<R>(fn())
    }

    return this as unknown as Maybe<R>
  }

  /**
   * Unwraps the value inside the Maybe instance.
   * @returns {T | null | undefined} The value or absence of a value.
   */
  unwrap(): T | null | undefined {
    return this.value
  }

  /**
   * Flattens a Maybe instance by removing one level of nesting, if applicable.
   * If the internal value is a Maybe instance, returns that instance directly;
   * otherwise, returns the original Maybe instance.
   * @returns {Maybe<MaybeValueType<T>>} A new Maybe instance with one level of nesting removed.
   */
  flat(): Maybe<MaybeValueType<T>> {
    if (this.value instanceof Maybe) {
      return this.value
    }
    return this as unknown as Maybe<MaybeValueType<T>>
  }

  /**
   * Maps the wrapped value of Maybe using a provided function and then flattens the result.
   * @template R - The type of the result after applying the function.
   * @param {function(MaybeValueType<T>): R} fn - The mapping function to apply to the internal value.
   * @returns {Maybe<R>} A new Maybe instance containing the result of applying the function.
   */
  flatMap<R>(fn: (value: MaybeValueType<T>) => R): Maybe<MaybeValueType<R>> {
    return this.flat().map(fn).flat()
  }
}

/**
 * Creates a Maybe instance from a value, allowing safe and functional handling of potentially nullable or undefined values.
 * @function maybe
 * @template T - The type of the value.
 * @param {T | undefined | null} value - The value to be wrapped in a Maybe instance.
 * @returns {Maybe<T>} A Maybe instance representing the provided value.
 * @example Using maybe to check if an environment variable is defined and convert it to a number
 * ```
 * const port = maybe(process.env.PORT)
 *   .map(value => Number(value))
 *   .map(value => Number.isNaN(value) ? 3000 : value)
 *   .unwrap();
 * ```
 */

export function maybe<T>(value: T | undefined | null): Maybe<T> {
  return Maybe.create(value)
}
