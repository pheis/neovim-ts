import * as treesitter from "nvim-treesitter.configs"

import { plugin } from "./plugin"

const treesitterCfg = {
  ensure_installed: [
    "c",
    "lua",
    "go",
    "rust",
    "tsx",
    "typescript",
    "javascript",
    "python",
    "json",
    "http",
    "fish",
    "fennel",
    "bash",
    "yaml",
  ],
  sync_install: false,
  highlight: {
    enable: true,
    additional_vim_regex_highlighting: false,
  },
}

export const treesitterPlugins = [
  plugin("nvim-treesitter/nvim-treesitter", () =>
    treesitter.setup(treesitterCfg)
  ),
]
