const app = require("express")();

app.use(require("cors")({}));
app.use(require('body-parser').json());
app.use(require("./permission"));
app.use(require("./model"));

app.get("/", (req, res) => {
    res.send("<h1 style='display:flex; justify-content:center; align-items:center; height:100%'>>>> PHILISTER <<<</h1>");
});

app.use("/element/", require("./view/element"));
app.use("/property/", require("./view/property"));
app.use("/group/", require("./view/group"));

app.use(require("./exception"));

module.exports = app;
