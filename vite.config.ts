import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/search-color/",
    plugins: [
        VitePWA({
            registerType: 'prompt',
            manifest: {
                short_name: "Search color",
                name: "Search color",
                icons: [
                    {
                        src: "favicon.ico",
                        sizes: "64x64 32x32 24x24 16x16",
                        type: "image/png"
                    },
                    {
                        src: "logo192.png",
                        type: "image/png",
                        sizes: "192x192"
                    },
                    {
                        src: "logo512.png",
                        type: "image/png",
                        sizes: "512x512"
                    }
                ],
                start_url: ".",
                display: "standalone",
                theme_color: "#000000",
                background_color: "#ffffff"
            }
        }),
        react()
    ]
})