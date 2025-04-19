
import postgres from "pg";
import { config } from "dotenv";


// set up the .env variables to appear under process.env
config();

const dbConfig = {
    user:       process.env.DB_USER,
    password:   process.env.DB_PASSWORD,
    database:   process.env.DB_NAME,
    host:       process.env.DB_HOST,
    port:       process.env.DB_PORT
};

export const dbPool = new postgres.Pool(dbConfig);

(async () => {
    try {
        await dbPool.connect();
    }
    catch(err){
        console.error("An error occurred when trying to connect to the database:", err);
    }
})();
