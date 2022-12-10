import { setKeys } from "./keymap"
import { setOptions } from "./options"

const setup = (): void => {
  setOptions()
  setKeys()

  vim.cmd("colo habamax")
}

setup()
