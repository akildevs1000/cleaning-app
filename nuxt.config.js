import colors from "vuetify/es5/util/colors";

export default {
  target: "static",

  head: {
    titleTemplate: "",
    title: "MyHotel",
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "",
      },
      {
        name: "format-detection",
        content: "telephone=no",
      },
    ],

    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.png",
      },
    ],
    script: [
      {
        type: "text/javascript",
        src: "https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.10.2/Sortable.min.js",
        async: false,
        body: false,
      }, // Insert in body
    ],
  },

  css: [],

  plugins: [
    {
      src: "~/plugins/axios.js",
    },

    "~/plugins/custom-methods.js",

  ],

  components: true,

  buildModules: [
    "@nuxtjs/vuetify",
    "@nuxtjs/dotenv",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth-next",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: "http://localhost:8001/api"
    baseURL: process.env.BACKEND_URL,
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "house-keeping/login",
            method: "post",
            propertyName: "token",
          },
          user: {
            url: "me",
            method: "get",
            propertyName: "user",
          },
          logout: false,
        },

        refreshToken: true,

        token: {
          //property: "tokens.access.token",
          global: true,
          type: "Bearer",
          maxAge: 60 * 60 * 24 * 365, // 8 Hours
        },
        autoLogout: false,
      },
    },

    redirect: {
      logout: "/login",
    },
  },

  router: {
    middleware: ["auth"],
  },

  pwa: {
    manifest: {
      lang: "en",
    },
    icon: {
      fileName: "/favicon.png",
    },
  },

  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#4338CA",
          // primary: "#5fafa3",
          accent: "#d8363a",
          secondary: "#242424",
          background: "#34444c",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          main_bg: "#ECF0F4",
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      "vuetify/lib",
    ],
  },

  server: {
    host: process.env.LOCAL_IP,
    port: process.env.LOCAL_PORT,
  },
};
