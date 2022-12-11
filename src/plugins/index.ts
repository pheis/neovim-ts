import { startup } from "packer"

import { lspPlugins } from "./lsp"
import { plugin } from "./plugin"
import { telescope } from "./telescope"
import { treesitterPlugins } from "./treesitter"

const plugins = [
  "wbthomason/packer.nvim",
  "justinmk/vim-dirvish",
  "tpope/vim-repeat",
  "tpope/vim-eunuch",
  "tpope/vim-rsi",
  "tpope/vim-abolish",
  "tpope/vim-surround",
  "tpope/vim-commentary",
  "tpope/vim-unimpaired",
  "tversteeg/registers.nvim",
  "jnurmine/Zenburn",
  "romainl/vim-qf",
  "terminalnode/sway-vim-syntax",
  "pearofducks/ansible-vim",
  "nvim-lua/plenary.nvim",
  "rhysd/conflict-marker.vim",
  "ellisonleao/gruvbox.nvim",
]
  .map(name => plugin(name))
  .concat([telescope, ...treesitterPlugins, ...lspPlugins])

export const loadPlugins = (): void => {
  startup(use => {
    plugins.forEach(plugin => use(plugin.def))
  })

  plugins.forEach(({ setup }) => {
    if (setup) {
      setup()
    }
  })
}
