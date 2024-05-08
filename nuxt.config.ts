// https://nuxt.com/docs/api/configuration/nuxt-config

const createPgString = () => {
  const pgConfig = {
    url: process.env.PG_URL ?? "localhost:5432",
    database: process.env.PG_DB ?? "homer",
    username: process.env.PG_USERNAME ?? "postgres",
    password: process.env.PG_PASSWORD ?? "postgres",
  };
  console.log("pgConfig", pgConfig);
  return `postgresql://${pgConfig.username}:${pgConfig.password}@${pgConfig.url}/${pgConfig.database}`;
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
