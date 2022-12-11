type ObjectKey = string | symbol | number

const keys: <Obj extends Record<string, unknown>>(
  obj: Readonly<Obj>
) => (keyof Obj)[] = obj => Object.keys(obj)

type Entry<Obj extends Record<ObjectKey, any>> = {
  [Key in keyof Obj]: [Key, Obj[Key]]
}[keyof Obj]

const entries: <Obj extends Record<string, any>>(
  obj: Obj
) => Entry<Obj>[] = obj => Object.entries(obj)

const mapValues = <
  Obj extends Record<ObjectKey, unknown>,
  Fn extends (a: Obj[keyof Obj]) => unknown
>(
  obj: Obj,
  fn: Fn
): {
  [Key in keyof Obj]: ReturnType<Fn>
} => {
  const mapped: Record<string, unknown> = {}

  Object.entries(obj).forEach(
    ([key, value]) => (mapped[key] = fn(value as never))
  )

  return mapped as never
}

const mapKeys = <
  Obj extends Record<ObjectKey, unknown>,
  Fn extends (a: keyof Obj) => ObjectKey
>(
  obj: Obj,
  fn: Fn
): Record<ReturnType<Fn>, Obj[keyof Obj]> => {
  const mapped: Record<string, unknown> = {}

  Object.entries(obj).forEach(
    ([key, value]) => (mapped[fn(key as never) as never] = value)
  )

  return mapped as never
}

export { keys, entries, mapValues, mapKeys }
