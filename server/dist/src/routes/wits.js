"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const wits_1 = require("../controllers/wits");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post("/create", auth_1.authenticateUser, (0, express_async_handler_1.default)(async (req, res) => {
    (0, wits_1.createWit)(req, res);
}));
router.post("/like", auth_1.authenticateUser, (0, express_async_handler_1.default)(async (req, res) => {
    (0, wits_1.likeWit)(req, res);
}));
router.delete("/unlike", auth_1.authenticateUser, (0, express_async_handler_1.default)(async (req, res) => {
    (0, wits_1.unlikeWit)(req, res);
}));
router.get("/explore", (0, express_async_handler_1.default)(async (req, res) => {
    (0, wits_1.fetchRecentWits)(req, res);
}));
router.get("/:id", (0, express_async_handler_1.default)(async (req, res) => {
    (0, wits_1.findWit)(req, res);
}));
exports.default = router;
//# sourceMappingURL=wits.js.map