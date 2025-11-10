import express from  "express";

const app = express();

app.get("", (req, res) => {
    res.send("Hello!");
});
app.listen(4444, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log("Server OK");
});