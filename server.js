const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

// a CRA build kimenete:
app.use(express.static(path.join(__dirname, "build")));

// SPA fallback (react-router esetén fontos)
app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Static React served on port ${port}`);
});
