declare module "packer" {
  type PluginDefinition =
    | string
    | {
        requires?: PluginDefinition
        config?: string | (() => void)
      }
  type Use = (pluginDef: PluginDefinition) => void

  const startup: (useFn: Use) => void
}
