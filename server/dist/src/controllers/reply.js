"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikeReply = exports.likeReply = exports.createReply = void 0;
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
const likeReply = (req, res) => {
    console.log(req.body);
    if (!req.body.reply || !req.body.user)
        return res.sendStatus(400);
    const { reply } = req.body;
    const { user } = req.body.user;
    index_1.prisma.replyLikes
        .create({
        data: {
            userId: user.id,
            replyId: reply.id,
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
    })
        .then((data) => res.status(201).json(data))
        .catch((_e) => res.sendStatus(400));
    return;
};
exports.likeReply = likeReply;
const unlikeReply = (req, res) => {
    if (!req.body.reply || !req.body.user)
        return res.sendStatus(400);
    const { reply } = req.body;
    const { user } = req.body.user;
    console.log("??");
    index_1.prisma.replyLikes
        .delete({
        where: {
            userId_replyId: {
                userId: user.id,
                replyId: reply.id,
            },
        },
    })
        .then((data) => res.status(202).json(data))
        .catch((_e) => res.sendStatus(400));
    return;
};
exports.unlikeReply = unlikeReply;
//# sourceMappingURL=reply.js.map