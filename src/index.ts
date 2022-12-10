import { setupKeymap } from "./keymap"

const setup = (): void => {
  setupKeymap()

  vim.cmd("colo zellner")
}

setup()
