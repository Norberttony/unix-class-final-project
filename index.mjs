
import pathModule from "path";

import express from "express";
import http from "http";

import { config } from "dotenv";

// set up the .env variables to appear under process.env
config();

const app = express();
const server = http.createServer(app);

// allow requesting files under ./public
app.use(express.static("./public"));

// prepare a file when user requests /
app.get("/", (req, res) => {
    const idxPath = pathModule.resolve("./public/index.ejs");
    res.render(idxPath, { title: "No title set" });
});

// listen to requests
server.listen(process.env.PORT);
console.log(`Listening to port ${process.env.PORT}`);
