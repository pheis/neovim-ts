import { setKeys } from "./keymap"
import { setOptions } from "./options"
import { loadPlugins } from "./plugins"

const setup = (): void => {
  loadPlugins()

  setOptions()

  setKeys()

  vim.cmd("colo gruvbox")
}

setup()
