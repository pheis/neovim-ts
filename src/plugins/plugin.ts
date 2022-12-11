import type { PluginDefinition } from "packer"

export type Plugin = {
  def: PluginDefinition
  setup?: () => void
}


export const plugin = (def: PluginDefinition, setup?: () => void): Plugin => ({
  def,
  setup,
})
