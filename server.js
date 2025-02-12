 
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
    console.log(`Memory Game running at http://localhost:${PORT}`);
});
