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
exports.solvedSets = void 0;
const typeorm_1 = require("typeorm");
const users_1 = require("./users");
const sets_1 = require("./sets");
let solvedSets = class solvedSets {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], solvedSets.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], solvedSets.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], solvedSets.prototype, "setId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
    }),
    __metadata("design:type", Number)
], solvedSets.prototype, "answerRate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_1.users, (user) => user.id),
    __metadata("design:type", users_1.users)
], solvedSets.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sets_1.sets, (set) => set.userId, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", sets_1.sets)
], solvedSets.prototype, "set", void 0);
solvedSets = __decorate([
    (0, typeorm_1.Entity)()
], solvedSets);
exports.solvedSets = solvedSets;
//# sourceMappingURL=solvedSets.js.map