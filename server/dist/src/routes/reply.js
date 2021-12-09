"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_1 = require("../controllers/auth");
const reply_1 = require("../controllers/reply");
const router = (0, express_1.Router)();
router.post("/create", auth_1.authenticateUser, (0, express_async_handler_1.default)(async (req, res) => {
    (0, reply_1.createReply)(req, res);
}));
exports.default = router;
//# sourceMappingURL=reply.js.map