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

export { keys, entries }
