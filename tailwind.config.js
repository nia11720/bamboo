import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'
import scrollbar from 'tailwind-scrollbar'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,jsx}'],
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['ic', 'vscode-icons', 'logos']),
    }),
    scrollbar({ nocompatible: true }),
  ],
}
