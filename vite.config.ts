import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
    resolve: {
        alias: {
            utils: path.resolve(__dirname, "./src/lib/util"),
            jukebox: path.resolve(__dirname, "./src/lib/jukebox")
        }
    },
})
