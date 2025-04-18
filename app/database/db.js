import pkg from "pg"

const {Pool} = pkg

const pool = new pool({
    host:process.env.DB_HOST || "localhost",
    user:process.env.DB_USER || "postgres",
    password:process.env.DB_PASSWORD || "password123",
    port:process.env.DB_PORT || 5432,
});

export default pool;
