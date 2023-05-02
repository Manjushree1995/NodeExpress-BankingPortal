const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

// Read the contents of the accounts.json file
const accountData = fs.readFileSync(
  path.join(__dirname, "/json/accounts.json"),
  "utf8"
);

// Parse the contents of the file into a JavaScript object
const accounts = JSON.parse(accountData);

// Set the "public" directory as the static directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Set the "views" directory for the "ejs" templates
app.set("views", path.join(__dirname, "views"));

// Set the view engine to "ejs"
app.set("view engine", "ejs");

const userData = fs.readFileSync(
  path.join(__dirname, "/json/users.json"),
  "utf8"
);
const users = JSON.parse(userData);

//Define the route for the root URL path "/"
app.get("/", (req, res) => {
  // Render the "index" view and pass an object with a "title" key-value pair
  // and a new key-value pair "accounts: accounts"
  res.render("index", { title: "Account Summary", accounts: accounts });
});

app.get("/savings", (req, res) => {
  res.render("account", {
    title: "Account Summary",
    account: accounts.savings,
  });
});
app.get("/checking", (req, res) => {
  res.render("account", {
    title: "Account Summary",
    account: accounts.checking,
  });
});
app.get("/credit", (req, res) => {
  res.render("account", { title: "Account Summary", account: accounts.credit });
});
app.get("/transfer", (req, res) => {
  res.render("transfer", {
    title: "Account Summary",
    account: accounts.credit,
  });
});

app.get("/profile", (req, res) => {
  res.render("profile", { user: users[0] });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
