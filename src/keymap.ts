import { lazy, partial } from "./lib/fn"
import { mapKeys } from "./lib/obj"
import { chars } from "./lib/string"
import { toggle_bg, toggle_diagnostics } from "./utils/togglers"
import * as telescope from "./plugins/telescope"
const set = vim.keymap.set
const nmap = partial(set, "n")
const vmap = partial(set, "v")

const cmd: (cmd: string) => () => void = vimCmd => lazy(vim.cmd, vimCmd)

const leaderMappings = {
  // "" space space to like spacemacs
  "<leader>": ":",

  m: cmd("make"),
  w: cmd("write"),
  fa: cmd("Telescope find_files"),

  ...telescope.leaderMappings,
}

// prettier-ignore
const nmaps = {

  "yon": (): void => ["set invnumber", "set invrelativenumber"].forEach(s => vim.cmd(s)),
  "yoh": cmd("set invhlsearch"),
  "yod": toggle_diagnostics,
  "yob": toggle_bg,

  "]q": cmd("cnext"),
  "[q": cmd("cprev"),

  ...mapKeys(leaderMappings, key => `<leader>${key}`)
}

const setKeys = (): void => {
  // set space for leader
  vim.g.mapleader = " "

  // normal maps
  Object.entries(nmaps).forEach(([left, right]) => nmap(left, right))

  // fd to Esc
  set(chars("ivt"), "fd", "<Esc>")

  // Easier Moving between splits
  chars("HJKL").forEach(key => nmap(`<C-${key}>`, `<C-W><C-${key}>`))

  // eslint-disable-next-line no-useless-escape
  // vim script version was...
  // vnoremap // y/\V<C-r>=escape(@",'/\')<CR><CR>
  vmap("//", "y/\\V<C-r>=escape(@\",'/')<CR><CR>")

  // very magic
  set(chars("vn"), "/", "/\v)")
}

export { setKeys }
