"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.authenticateUser = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../../index");
const bcrypt_1 = __importDefault(require("bcrypt"));
const secret = String(process.env.JWT_SECRET);
const inProduction = process.env.NODE_ENV === "prudction";
const signJWT = (req, res) => {
    const { user } = req.body;
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        username: user.username,
        email: user.email,
    }, secret, {
        expiresIn: 1000 * 60 * 60 * 24 * 7 * 52,
    });
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: inProduction && "lax",
        secure: inProduction,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 52,
    });
};
exports.signJWT = signJWT;
const authenticateUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(200).json(null);
    }
    jsonwebtoken_1.default.verify(token, secret, undefined, async (err, payload) => {
        if (err) {
            return res.status(403).json({
                error: "not authorized",
            });
        }
        const { email } = payload;
        let success = true;
        const user = await index_1.prisma.user
            .findUnique({ where: { email } })
            .catch((err) => {
            success = false;
            return err;
        });
        if (user && success) {
            user.password = "";
            req.body = { user };
            next();
            return;
        }
        res.status(404).json({ error: "account not found" });
        return;
    });
    return;
};
exports.authenticateUser = authenticateUser;
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(password);
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
        (0, exports.signJWT)(req, res);
        user.password = "";
        res.json({ user });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { username, email, password } = req.body;
    const credentials = username ? { username } : { email };
    const user = await index_1.prisma.user.findUnique({
        where: credentials,
    });
    if (user) {
        if (bcrypt_1.default.compareSync(password, user.password)) {
            req.body = { user };
            (0, exports.signJWT)(req, res);
            user.password = "";
            res.json({ user });
        }
        else {
            res
                .status(400)
                .json({ error: "username, email, or password are incorrect" });
        }
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.js.map