import { startup } from "packer"

import {treesitter} from './treesitter'
import {telescope} from './telescope'
import {Plugin} from './Plugin'

// local execute = vim.api.nvim_command
// local fn = vim.fn

// local install_path = fn.stdpath("data") .. "/site/pack/packer/start/packer.nvim"

// if fn.empty(fn.glob(install_path)) > 0 then
//   execute("!git clone https://github.com/wbthomason/packer.nvim " .. install_path)
//   execute("packadd packer.nvim")
// end
//

const simplePlugins = [
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

const configuredPlugins: Plugin[] = [
  treesitter,
  telescope,
]

export const loadPlugins = (): void => {
  const plugins = simplePlugins.concat(configuredPlugins.map(plugin => plugin.name))

  startup(use => plugins.forEach(plugin => use(plugin)))

  configuredPlugins.forEach(plugin => plugin.setup())
}
