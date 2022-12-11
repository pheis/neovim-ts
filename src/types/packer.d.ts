/** @noResolution */
declare module "packer" {
  type PluginDefinition =
    | string
    | {
        [0]: string
        requires?: PluginDefinition
        config?: string | (() => void)
      }
  type Use = (pluginDef: PluginDefinition) => void

  const startup: (use: (use: Use) => void) => void
}
