"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRecentWits = exports.createWit = void 0;
const index_1 = require("../../index");
const createWit = async (req, res) => {
    const { content, image } = req.body;
    const { user } = req.body.user;
    const username = user.username;
    if (!user)
        return;
    const newWit = await index_1.prisma.wit.create({
        data: {
            content,
            image: image ? image : null,
            user: {
                connect: {
                    username,
                },
            },
        },
        include: { user: true },
    });
    res.status(200).json(newWit);
};
exports.createWit = createWit;
const fetchRecentWits = async (req, res) => {
    const { skip } = req.body;
    const recentWits = await index_1.prisma.wit.findMany({
        skip,
        take: 50,
        include: {
            user: {
                select: {
                    username: true,
                },
            },
            replies: {
                include: {
                    user: {
                        select: {
                            username: true,
                            id: true,
                            picture: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    res.status(200).json(recentWits);
};
exports.fetchRecentWits = fetchRecentWits;
//# sourceMappingURL=wits.js.map