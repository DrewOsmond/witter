"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReply = void 0;
const index_1 = require("../../index");
const createReply = async (req, res) => {
    const { user, content, witId } = req.body;
    try {
        const newReply = await index_1.prisma.reply.create({
            data: {
                content,
                user: {
                    connect: {
                        username: user.user.username,
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
    }
    catch (e) {
        console.log(e);
        res.status(400);
    }
};
exports.createReply = createReply;
//# sourceMappingURL=reply.js.map