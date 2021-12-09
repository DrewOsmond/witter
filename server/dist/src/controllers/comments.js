"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeComment = void 0;
const index_1 = require("../../index");
const makeComment = async (req, res) => {
    const { user, content, witId } = req.body;
    const newComment = await index_1.prisma.reply.create({
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
};
exports.makeComment = makeComment;
//# sourceMappingURL=comments.js.map