// https://nuxt.com/docs/api/configuration/nuxt-config

const createPgString = () => {
  const user = process.env.PG_USER || "postgres";
  const password = process.env.PG_PASSWORD || "postgres";
  const host = process.env.PG_HOST || "localhost:5432";
  const database = process.env.PG_DATABASE || "homer";
  return `postgresql://${user}:${password}@${host}/${database}`;
};

export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    pgString: createPgString(),
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});
