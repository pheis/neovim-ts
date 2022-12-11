/** @noResolution */
declare module "packer" {
type PluginDefinition = string | LuaTable<number | "requires", string | number[]>
  type Use = (pluginDef: PluginDefinition) => void

  const startup: (use: (use: Use) => void) => void
}


/** @noResolution */
declare module "typescript" {
  const setup: (args: Record<string, any>) => void
}

