import { lazy, partial } from "./lib/fn"
import { chars } from "./lib/string"

const set = vim.keymap.set
const nmap = partial(set, "n")
const vmap = partial(set, "v")

const cmd: (cmd: string) => () => void = vimCmd => lazy(vim.cmd, vimCmd)

// prettier-ignore
const nmaps = {
  // "" space space to like spacemacs
  "<leader><leader>": ":",
  "yon": (): void => ["set invnumber", "set invrelativenumber"].forEach(s => vim.cmd(s)),
  "yoh": cmd("set invhlsearch"),
  "]q": cmd("cnext"),
  "[q": cmd("cprev"),
  "<leader>m": cmd("make"),
  "<leader>w": cmd("write"),
}

const setupKeymap = (): void => {
  // normal maps
  Object.entries(nmaps).forEach(([left, right]) => nmap(left, right))

  // fd to Esc
  set(chars("ivt"), "fd", "<Esc>")

  // Easier Moving between splits
  chars("HJKL").forEach(key => nmap(`C-${key}`, `:<C-W><C-${key}>`))

  // eslint-disable-next-line no-useless-escape
  // vim script version was...
  // vnoremap // y/\V<C-r>=escape(@",'/\')<CR><CR>
  vmap("//", "y/\\V<C-r>=escape(@\",'/')<CR><CR>")

  // very magic
  set(chars("vn"), "/", "/\v)")
}

export { setupKeymap }
