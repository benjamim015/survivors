import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const isInfected = String(req.query.isInfected) === 'true' || false;

    const count = await prisma.survivor.count({
      where: { isInfected },
    });
    const survivors = await prisma.survivor.findMany({
      where: {
        isInfected,
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        name: 'asc',
      },
    });

    const lastPage = Math.ceil(count / limit);
    const nextPage = page + 1 <= lastPage ? page + 1 : undefined;

    return res.status(200).json({
      page,
      limit,
      next_page: nextPage,
      last_page: lastPage,
      survivors,
    });
  }

  return res
    .status(200)
    .json({ message: 'Nothing here, go back or you will get infected!!' });
}
