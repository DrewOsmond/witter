"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post("/login", (0, express_async_handler_1.default)(async (req, res) => {
    (0, auth_1.loginUser)(req, res);
}));
router.post("/register", (0, express_async_handler_1.default)(async (req, res) => {
    (0, auth_1.registerUser)(req, res);
}));
router.post("/restore", auth_1.authenticateUser, (0, express_async_handler_1.default)((req, res) => {
    const { user } = req.body.user;
    if (!user)
        return;
    res.json(user);
}));
router.delete("/logout", (_req, res) => {
    res.clearCookie("token").sendStatus(200);
});
exports.default = router;
//# sourceMappingURL=user.js.map