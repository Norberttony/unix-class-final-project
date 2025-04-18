
import pathModule from "path";

import express from "express";
import http from "http";
import { dbPool } from "./modules/database.mjs";


const app = express();
const server = http.createServer(app);

// Set the view engine to EJS
app.set("view engine", "ejs");

app.set("views", pathModule.resolve("./public"));

// allow requesting files under ./public
app.use(express.static("./public"));

// prepare a file when user requests /
app.get("/", (req, res) => {
    //const idxPath = pathModule.resolve("./public/index.ejs");
    res.render("index", { title: "Landing Page" });
});

// listen to requests
server.listen(3000);
console.log(`Listening to port 3000`);
