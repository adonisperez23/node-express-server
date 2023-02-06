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
exports.Factura = void 0;
var typeorm_1 = require("typeorm");
var Usuario_1 = require("./Usuario");
var Factura = (function () {
    function Factura() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Factura.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("date"),
        __metadata("design:type", String)
    ], Factura.prototype, "fecha", void 0);
    __decorate([
        (0, typeorm_1.Column)("time"),
        __metadata("design:type", String)
    ], Factura.prototype, "hora", void 0);
    __decorate([
        (0, typeorm_1.Column)("money"),
        __metadata("design:type", Number)
    ], Factura.prototype, "monto_total", void 0);
    __decorate([
        (0, typeorm_1.Column)("json"),
        __metadata("design:type", Object)
    ], Factura.prototype, "pedido", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Usuario_1.Usuario; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Usuario_1.Usuario)
    ], Factura.prototype, "cliente", void 0);
    Factura = __decorate([
        (0, typeorm_1.Entity)()
    ], Factura);
    return Factura;
}());
exports.Factura = Factura;
