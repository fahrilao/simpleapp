// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@vee-validate/nuxt"],
  runtimeConfig: {
    public: { baseUrl: process.env.BASE_URL },
  },
  plugins: [
    { src: "~/plugins/01.events", mode: "client" },
    { src: "~/plugins/02.alerts", mode: "client" },
    { src: "~/plugins/03.charts", mode: "client" },
  ],
})
