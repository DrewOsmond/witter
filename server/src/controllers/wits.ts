import { prisma } from "../../index";
import { Request, Response } from "express";

export const createWit = async (req: Request, res: Response) => {
  const { content, image } = req.body;
  const { user } = req.body.user;
  const username = user.username;

  if (!user) return;

  const newWit = await prisma.wit.create({
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

export const likeWit = async (req: Request, res: Response) => {
  const { user } = req.body.user;
  const { wit } = req.body;
  try {
    const newLike = await prisma.witLikes.create({
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
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const unlikeWit = async (req: Request, res: Response) => {
  if (!req.body.witId) {
    return res.sendStatus(500);
  }

  const { user } = req.body.user;
  const { witId } = req.body;
  try {
    await prisma.witLikes.delete({
      where: {
        userId_witId: {
          userId: user.id,
          witId,
        },
      },
    });

    return res.sendStatus(202);
  } catch (e) {
    return res.sendStatus(400);
  }
};

export const fetchRecentWits = async (req: Request, res: Response) => {
  const { skip } = req.body;
  const recentWits = await prisma.wit.findMany({
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
