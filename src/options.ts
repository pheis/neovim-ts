// See :help option-list
const options = {
  expandtab: true,
  shiftwidth: 2,
  tabstop: 2,
  softtabstop: 2,

  scrolloff: 3,
  sidescrolloff: 3,

  updatetime: 100,

  relativenumber: true,
  number: true,

  showcmd: true,

  wildmenu: true,

  showmatch: true,

  incsearch: true,
  hlsearch: true,

  termguicolors: true,

  winblend: 10,
  pumblend: 10,
  signcolumn: "yes",

  laststatus: 3,
}

const setOptions = (): void =>
  Object.entries(options).forEach(
    ([key, value]) => (vim.opt[key as never] = value as never)
  )

export { setOptions }
