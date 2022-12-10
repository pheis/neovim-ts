/* eslint-disable @typescript-eslint/no-explicit-any */
type FnLike = (...args: any[]) => any

type Tail<Arr extends any[]> = Arr extends [any, ...infer Rest] ? Rest : never

type Take<
  N extends number,
  Arr extends any[],
  Taken extends any[] = []
> = Taken["length"] extends N
  ? Taken
  : Take<N, Arr, [...Taken, Arr[Taken["length"]]]>

type Drop<
  N extends number,
  Arr extends any[],
  Dropped extends any[] = []
> = Dropped["length"] extends N ? Arr : Drop<N, Tail<Arr>, [...Dropped, Arr[0]]>

export const partial =
  <Fn extends FnLike, Params extends readonly unknown[]>(
    fn: Fn,
    ...params: Params extends Take<Params["length"], Parameters<Fn>>
      ? Params
      : never
  ) =>
  (...rest: Drop<Params["length"], Parameters<Fn>>): ReturnType<Fn> =>
    fn(...(params.concat(rest) as never[])) as never

export const lazy =
  <Fn extends FnLike>(fn: Fn, ...params: Parameters<Fn>) =>
  (): ReturnType<Fn> =>
    fn(...params) as never
