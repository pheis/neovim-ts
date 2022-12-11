import { setup } from "nvim-treesitter.configs"
import { plugin } from "./plugin"

export const treesitter = plugin("nvim-treesitter/nvim-treesitter", () =>
  setup({
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
  })
)
