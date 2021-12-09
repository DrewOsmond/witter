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
    include: { user: true },
  });

  res.status(200).json(newWit);
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
