"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var typeorm_1 = require("typeorm");
var Usuario = (function () {
    function Usuario() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Usuario.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 50
        }),
        __metadata("design:type", String)
    ], Usuario.prototype, "nombre", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 20
        }),
        __metadata("design:type", String)
    ], Usuario.prototype, "telefono", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 50
        }),
        __metadata("design:type", String)
    ], Usuario.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)("boolean"),
        __metadata("design:type", Boolean)
    ], Usuario.prototype, "esAdmin", void 0);
    Usuario = __decorate([
        (0, typeorm_1.Entity)()
    ], Usuario);
    return Usuario;
}());
exports.Usuario = Usuario;
