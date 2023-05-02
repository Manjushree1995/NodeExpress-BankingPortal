const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");

// Set the directory for views
app.set("views", path.join(__dirname, "views"));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static assets from the "public" directory
//app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// Define the route for the root URL path "/"
app.get("/", (req, res) => {
  // Render the "index" view and pass an object with a "title" key-value pair
  res.render("index", { title: "Index" });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
