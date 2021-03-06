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
    const mobileToken = req.body.token;
    if (!token && !mobileToken) {
        return res.status(200).json(null);
    }
    const selectedToken = token ? token : mobileToken;
    jsonwebtoken_1.default.verify(selectedToken, secret, undefined, async (err, payload) => {
        if (err) {
            return res.status(403).json({
                error: "not authorized",
            });
        }
        const { email } = payload;
        let success = true;
        const user = await index_1.prisma.user
            .findUnique({
            where: { email },
            include: {
                witLikes: true,
                replyLikes: true,
            },
        })
            .catch((err) => {
            success = false;
            return err;
        });
        if (user && success) {
            user.password = "";
            req.body.user = { user };
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
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
        },
        include: {
            witLikes: true,
            replyLikes: true,
        },
    })
        .catch((err) => {
        res.status(400).json({ error: "username or email already taken" });
        succeeded = false;
        return err;
    });
    if (user && succeeded) {
        req.body = { user };
        (0, exports.signJWT)(req, res);
        user.password = "";
        res.json(user);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    if ((!username && !email) || !password) {
        return res.status(400).json({ error: "must include valid credentials" });
    }
    const credentials = username
        ? {
            username: username.toLowerCase().trim(),
        }
        : { email: email.toLowerCase() };
    console.log(credentials, password);
    const user = await index_1.prisma.user.findUnique({
        where: credentials,
        include: {
            witLikes: true,
            replyLikes: true,
        },
    });
    if (user && bcrypt_1.default.compareSync(password, user.password)) {
        req.body = { user };
        (0, exports.signJWT)(req, res);
        user.password = "";
        return res.json(user);
    }
    return res
        .status(400)
        .json({ error: "username, email, or password are incorrect" });
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.js.map