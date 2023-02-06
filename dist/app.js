"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app_data_source_1 = require("./app-data-source");
app_data_source_1.localDataSource
    .initialize()
    .then(function () {
    console.log("la fuente de datos ha sido inicializada");
})
    .catch(function (err) {
    console.log("ha ocurrido el error : ".concat(err));
});
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send("hola mundo");
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log('servidor encendido!');
});
