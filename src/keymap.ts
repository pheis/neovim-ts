import { lazy, partial } from "./lib/fn"
import { mapKeys } from "./lib/obj"
import { chars } from "./lib/string"
import * as telescope from "./plugins/telescope"
import { toggle_bg, toggle_diagnostics } from "./utils/togglers"

const set = vim.keymap.set
const nmap = partial(set, "n")
const vmap = partial(set, "v")

const cmd: (cmd: string) => () => void = vimCmd => lazy(vim.cmd, vimCmd)

const leaderMappings = {
  // "" space space to like spacemacs
  "<leader>": ":",

  m: cmd("make"),
  w: cmd("write"),

  // D: "<cmd>lua vim.lsp.buf.type_definition()<CR>", o
  r: vim.lsp.buf.rename,
  a:vim.lsp.buf.code_action,
  // <space>e: "<cmd>lua vim.diagnostic.open_float()<CR>", opts)

  ...telescope.leaderMappings,
}


// prettier-ignore
const nmaps = {
  "yon": (): void => ["set invnumber", "set invrelativenumber"].forEach(s => vim.cmd(s)),
  "yoh": cmd("set invhlsearch"),
  "yod": toggle_diagnostics,
  "yob": toggle_bg,

  "gD": vim.lsp.buf.declaration,
  "gd": vim.lsp.buf.definition,
  "K": vim.lsp.buf.hover,
  "gi": vim.lsp.buf.implementation,
  "gK": vim.lsp.buf.signature_help,
  "gr": vim.lsp.buf.references,
  "[d":vim.diagnostic.goto_prev,
  "]d":vim.diagnostic.goto_next,

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
