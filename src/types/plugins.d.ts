type anySetup = (options?: Record<string, any>) => void

/** @noResolution */
declare module "packer" {
  type PluginDefinition =
    | string
    | LuaTable<number | "requires", string | number[]>
  type Use = (pluginDef: PluginDefinition) => void

  const startup: (use: (use: Use) => void) => void
}
/** @noResolution */

declare module "nvim-treesitter.configs" {
  const setup: anySetup
}

/** @noResolution */
declare module "telescope" {
  const setup: anySetup
}

/** @noResolution */
declare module "typescript" {
  const setup: anySetup
}

/** @noResolution */
declare module "mason" {
  const setup: anySetup
}
