import { lazy, partial } from "./lib/fn"
import { chars } from "./lib/string"

vim.cmd("colo zellner")

const set = vim.keymap.set
const nset = partial(set, "n")
const vset = partial(set, "v")

const cmd: (cmd: string) => () => void = vimCmd => lazy(vim.cmd, vimCmd)

// fd to Esc
set(chars("ivt"), "fd", "<Esc>")

// Easier Moving between splits
chars("HJKL").forEach(key => nset(`C-${key}`, `:<C-W><C-${key}>`))

// eslint-disable-next-line no-useless-escape
// vim script version was...
// vnoremap // y/\V<C-r>=escape(@",'/\')<CR><CR>
vset("//", "y/\\V<C-r>=escape(@\",'/')<CR><CR>")

// very magic
set(chars("vn"), "/", "/\v)")

// prettier-ignore
const nmaps = {
  // "" space space to like spacemacs
  "<leader><leader>": ":",
  "yon": (): void => ["set invnumber", "set invrelativenumber"].forEach(vim.cmd),
  "yoh": cmd("set invhlsearch"),
  "]q": cmd("cnext"),
  "[q": cmd("cprev"),
  "<leader>m": cmd("make"),
  "<leader>w": cmd("write"),
}
