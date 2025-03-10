import { apiEndpoint, repositoryName } from "./slicemachine.config.json";
import componentsConfig from "./config/nuxt/components";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // hooks: {
  //   "pages:extend"(pages) {
  //     console.log("Nuxt pages:", pages);
  //   },
  // },

  runtimeConfig: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },

  prismic: {
    endpoint: apiEndpoint || repositoryName,

    clientConfig: {
      routes: [
        {
          type: "page_home",
          path: "/",
        },

        {
          type: "page_default",
          path: "/:uid",
        },

        {
          type: "our_solutions",
          path: "/our-solutions",
        },

        {
          type: "article_solution",
          path: "/our-solutions/:uid",
        },
      ],
    },
  },

  imports: {
    dirs: [
      "composables",
      "composables/forms",
      "server/utils",
      "server/api/form",
    ],
  },

  ssr: false,

  build: {
    transpile: ["vee-validate"],
  },

  image: {
    imgix: {
      baseURL: "https://images.prismic.io/aion-website/",
    },
    domains: ["images.prismic.io"],
  },

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  components: componentsConfig,

  css: ["@/assets/css/main.scss", "@/assets/css/tailwind.scss"],

  devtools: { enabled: false, suspensible: false },

  plugins: ["./plugins/useSlice.js"],

  modules: [
    "@nuxtjs/prismic",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-font-loader",
    "@nuxtjs/device",
    "@nuxt/image",
    "nuxt-viewport",
  ],

  fontLoader: {
    local: [
      {
        src: "/fonts/RedHatDisplay.woff2",
        family: "RedHatDisplay",
        class: "RedHatDisplay",
      },
    ],
  },

  compatibilityDate: "2024-11-01",
});
