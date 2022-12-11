import {setup} from "telescope"

import {mapValues} from '../lib/obj'
import {plugin} from './plugin'
// TODO <leader>fd --> list files different than base branch (develop/main/master)

export const telescope = plugin(
"nvim-telescope/telescope.nvim",
() => setup([]))

// leader mappings
export const leaderMappings = mapValues({
"/":"live_grep",
"b": "buffers",
"*":"lsp_references",
"fa":"find_files",
"fg":"git_status",
"fo":"oldfiles",
"fq":"quickfix",
"s":"lsp_document_symbols",
"S":"lsp_workspace_symbols",
}, cmd => () => vim.cmd(`Telescope ${cmd}`))

// -- nnoremap <leader>m <cmd>Telescope marks<cr>
// -- nnoremap <leader>ao <cmd>Telescope lsp_code_actions theme=cursor<cr>
// -- nnoremap <leader>fh <cmd>Telescope help_tags<cr>
// -- nnoremap <leader>fq <cmd>Telescope quickfix<cr>

