/* eslint-disable @typescript-eslint/no-explicit-any */
type FnLike = (...args: any[]) => any

type Tail<Arr extends any[]> = Arr extends [any, ...infer Rest] ? Rest : never

type GetOutput<Value, Fns extends any[]> = Fns["length"] extends 0
  ? Value
  : Value extends Parameters<Fns[0]>[0]
  ? GetOutput<ReturnType<Fns[0]>, Tail<Fns>>
  : never

type AllUnary<
  Fns extends FnLike[],
  Checked extends FnLike[] = []
> = Checked["length"] extends Fns["length"]
  ? true
  : 1 extends Parameters<Fns[Checked["length"]]>["length"]
  ? AllUnary<Fns, [...Checked, Fns[Checked["length"]]]>
  : false

export type PipeOutput<Tuple extends any[]> = Tuple extends [
  infer First,
  ...infer Fns extends FnLike[]
]
  ? AllUnary<Fns> extends true
    ? GetOutput<First, Fns>
    : never
  : never

export const pipe = <Params extends any[]>(
  ...[first, ...rest]: Params
): PipeOutput<Params> =>
  rest.reduce((acc, fn: FnLike) => fn(acc) as never, first) as never

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

export const toUnary =
  <Fn extends FnLike>(fn: Fn) =>
  (params: Parameters<Fn>): ReturnType<Fn> =>
    fn(...params) as never
