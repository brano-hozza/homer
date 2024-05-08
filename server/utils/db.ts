// db.js
import postgres from "postgres";

const RUNTIME_CONFIG = useRuntimeConfig();

const sql = postgres(RUNTIME_CONFIG.pgString);

export default sql;
