module.exports = {
  mode: "universal",
  static: {
    prefix: false,
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "Hệ thống kế toán - ToanLuc JSC",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/logo.jpg" },
      {
        rel: "stylesheet",
        href: "/fontawesome-free-6.4.0-web/css/all.css",
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/scss/main.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/filters" },
    { src: "~/plugins/vuelidate" },
    { src: "~/plugins/integrations" },
    { src: "~/plugins/components" },
    { src: "~/plugins/toasted", ssr: false },
    { src: "~/plugins/paginate", ssr: false },
    { src: "~/plugins/jwpagination", ssr: false },
    { src: "~/plugins/sweetalert", ssr: false },
    { src: "~/plugins/sweetalert2", ssr: false },
    { src: "~/plugins/excelxlsx", ssr: false },
    { src: "~/plugins/event-bus", ssr: false },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "portal-vue/nuxt",
    "@nuxtjs/auth",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  /* axios: {
    baseURL: "http://localhost:9999",
  }, */
  axios: {
    baseURL: "http://10.42.240.200:7777/",
    // baseURL: "http://localhost:8888",
    // baseURL: "http://14.224.129.177:8888/",
    // baseURL: "http://103.104.119.144:8888/",
    timeout: 20000,
  },
  server: {
    // port: 8080, // default: 3000
    port: 8080,
    // host: "192.168.1.97", // default: localhost
    // host: "103.104.119.144",
  },
  /* proxy: {
    "/api": URL,
  }, */
  /* server: {
    port: 5000, // default: 3000
    //host: '0.0.0.0' // default: localhost
  }, */
  /* serverMiddleware: ["~/server/routes/index"], */
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.node = {
        fs: "empty",
      };
    },
    transpile: [/^ag-grid-vue/],
  },
  router: {
    middleware: ["auth"],
  },
  auth: {
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: "access_token",
          maxAge: 1800,
          global: true,
          // type: 'Bearer'
        },
        refreshToken: {
          property: "refresh_token",
          data: "refresh_token",
          maxAge: 60 * 60 * 24 * 30,
        },
        endpoints: {
          login: {
            url: "/api/users/auth/login",
            method: "post",
            propertyName: "token",
          },
          logout: { url: "/api/users/auth/login", method: "post" },
          user: {
            url: "/api/users/auth/user",
            method: "get",
            propertyName: false,
          }, // propertyName: false đặc biệt quan trọng - Nếu không đặt false không logedin:true
        },
        user: {
          property: "user",
          // autoFetch: true
        },
      },
    },

    redirect: {
      login: "/login",
      logout: "/login",
      callback: "/",
      home: "/",
    },

    // public: ["/"],
  },
};
