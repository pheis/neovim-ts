const toggle_bg = (): void => {
  const bg = vim.o.background
  vim.o.background = bg === "dark" ? "light" : "dark"
}

let diagnostics = false

const toggle_diagnostics = () => {
  if (diagnostics) {
    vim.diagnostic.disable()
  } else {
    vim.diagnostic.enable()
  }

  diagnostics = !diagnostics
}

export { toggle_bg, toggle_diagnostics }
