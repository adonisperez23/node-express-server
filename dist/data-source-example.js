"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
});
exports.AppDataSource = AppDataSource;
