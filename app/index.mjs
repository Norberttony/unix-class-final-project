
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
app.get("/", async (req, res) => {
    const fetchPosts = await dbPool.query("SELECT id, title, content FROM Posts");
    res.render("pages/index", { posts: fetchPosts.rows });
});

// fetch the post whenever the user searches with a post/number
app.get("/post/:id", async (req, res) => {
    // validate input
    const id = req.params.id;
    if (isNaN(id))
        return res.sendStatus(400); // bad request

    // fetch the post
    const postResult = await dbPool.query(`SELECT title, content FROM Posts WHERE id=${id}`);
    res.render("pages/post", postResult.rows[0]);
});

// simulate a crash
app.get("/crash", async (req, res) => {
    res.send("Crashed successfully");
    process.exit(1);
});

// listen to requests
server.listen(3000);
console.log(`Listening to port 3000`);
