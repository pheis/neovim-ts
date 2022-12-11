import {FnLike} from './fn'

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


// const mapValues: <
//   Obj extends Record<string, any>,
//   Fn extends (value: Obj[Key in keyof Obj]) => any
//   >(obj: Obj, fn: Fn): {
//   [Key in keyof Obj]: [Key, ReturnType<FnLike>]
// } => {
const mapValues = (obj: Record<string, any>, fn: FnLike) => {
  const mapped = {}

  Object.entries(obj).forEach(([key,value]) =>
            mapped[key] = fn(value)
                             )
                          return mapped
}

const mapKeys = (obj: Record<string, any>, fn: FnLike) => {
  const mapped = {}

  Object.entries(obj).forEach(([key,value]) =>
            mapped[fn(key)] = value
                             )
                          return mapped
}

export { keys, entries, mapValues, mapKeys}

