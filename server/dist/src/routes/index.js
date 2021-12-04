"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const wits_1 = __importDefault(require("./wits"));
const router = (0, express_1.Router)();
router.use("/session", user_1.default);
router.use("/wit", wits_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map