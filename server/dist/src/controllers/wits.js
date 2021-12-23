"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findWit = exports.fetchRecentWits = exports.unlikeWit = exports.likeWit = exports.createWit = void 0;
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
        include: {
            user: {
                select: {
                    username: true,
                    id: true,
                    picture: true,
                },
            },
            likes: true,
        },
    });
    res.status(200).json(newWit);
};
exports.createWit = createWit;
const likeWit = async (req, res) => {
    const { user } = req.body.user;
    const { wit } = req.body;
    try {
        const newLike = await index_1.prisma.witLikes.create({
            data: {
                userId: user.id,
                witId: wit.id,
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
        res.status(201).json(newLike);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};
exports.likeWit = likeWit;
const unlikeWit = async (req, res) => {
    if (!req.body.witId) {
        return res.sendStatus(400);
    }
    const { user } = req.body.user;
    const { witId } = req.body;
    try {
        await index_1.prisma.witLikes.delete({
            where: {
                userId_witId: {
                    userId: user.id,
                    witId,
                },
            },
        });
        return res.sendStatus(202);
    }
    catch (e) {
        return res.sendStatus(400);
    }
};
exports.unlikeWit = unlikeWit;
const fetchRecentWits = async (req, res) => {
    const { skip } = req.body;
    const recentWits = await index_1.prisma.wit.findMany({
        skip,
        take: 50,
        include: {
            user: {
                select: {
                    username: true,
                    picture: true,
                    id: true,
                },
            },
            likes: {
                include: {
                    user: {
                        select: {
                            username: true,
                            picture: true,
                            id: true,
                        },
                    },
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
                    likes: {
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
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    res.status(200).json(recentWits);
};
exports.fetchRecentWits = fetchRecentWits;
const findWit = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.sendStatus(400);
    }
    const wit = await index_1.prisma.wit.findMany({
        include: {
            user: {
                select: {
                    username: true,
                    picture: true,
                    id: true,
                },
            },
            likes: {
                include: {
                    user: {
                        select: {
                            username: true,
                            picture: true,
                            id: true,
                        },
                    },
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
                    likes: {
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
            },
        },
        where: { id: Number(id) },
    });
    if (wit) {
        return res.status(200).json(wit);
    }
    else {
        return res.status(404).json({ error: "no wit found" });
    }
};
exports.findWit = findWit;
//# sourceMappingURL=wits.js.map