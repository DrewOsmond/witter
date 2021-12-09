"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeReply = void 0;
const index_1 = require("../../index");
const makeReply = async (req, res) => {
    const { user, content, witId } = req.body;
    const newReply = await index_1.prisma.reply.create({
        data: {
            content,
            user: {
                connect: {
                    username: user.username,
                },
            },
            wit: {
                connect: {
                    id: witId,
                },
            },
        },
        include: {
            user: {
                select: {
                    username: true,
                    id: true,
                    picture: true,
                },
            },
        },
    });
    res.status(201).json(newReply);
};
exports.makeReply = makeReply;
//# sourceMappingURL=comments.js.map