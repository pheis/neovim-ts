import { partial } from "./lib/fn"
vim.cmd("colo zellner")

const imap = partial(vim.keymap.set, "i")

imap("fd", "<Esc>")

// vim.keymap.set("i", "fd", "<Esc>")

// const n
