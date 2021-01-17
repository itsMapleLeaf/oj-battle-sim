import { Plugin } from "vite"

declare function babelMacros(): Plugin
export = babelMacros
