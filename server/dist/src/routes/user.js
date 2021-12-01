"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../../index");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post("/login", (0, express_async_handler_1.default)(async (req, res) => {
    const { username, email, password } = req.body;
    const credentials = username ? { username } : { email };
    const user = await index_1.prisma.user.findUnique({
        where: credentials,
    });
    if (user) {
        if (bcrypt_1.default.compareSync(password, user.password)) {
            req.body = { user };
            (0, auth_1.signJWT)(req, res);
            user.password = "";
            res.json(user);
        }
        else {
            res
                .status(400)
                .json({ error: "username, email, or password are incorrect" });
        }
    }
}));
router.post("/register", (0, express_async_handler_1.default)(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt_1.default.hash(password, 12);
    const isEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.toLowerCase().match(isEmail)) {
        res.status(400).json({ error: "please use a valid email" });
        return;
    }
    let succeeded = true;
    const user = await index_1.prisma.user
        .create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    })
        .catch((err) => {
        succeeded = false;
        return err;
    });
    if (user && succeeded) {
        req.body = { user };
        (0, auth_1.signJWT)(req, res);
        user.password = "";
        res.json(user);
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map