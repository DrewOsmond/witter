"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const index_1 = require("../index");
const router = (0, express_1.Router)();
router.post("/login", (0, express_async_handler_1.default)(async (req, res) => {
    const { username, email, password } = req.body;
    const credentials = username ? { username } : { email };
    const user = await index_1.prisma.user.findUnique({ where: credentials });
    if ((user === null || user === void 0 ? void 0 : user.password) === password) {
        res.json(user);
    }
    else {
        res
            .status(400)
            .json({ error: "username, email, or password are incorrect" });
    }
}));
router.post("/register", (0, express_async_handler_1.default)(async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = await index_1.prisma.user.create({
        data: {
            username,
            email,
            password,
        },
    });
    console.log(newUser);
    res.json(newUser);
}));
exports.default = router;
//# sourceMappingURL=user.js.map