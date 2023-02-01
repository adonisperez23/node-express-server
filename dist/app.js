"use strict";
const express = require("express");
const app = express();
app.get('/', (req, res) => {
    console.log(req, res);
    res.send("hola mundo");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('servidor encendido!');
});
