// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';
import { SurvivorProps } from '@/types/survivor.types';
import { join } from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const isInfected = String(req.query.isInfected) === 'true' || false;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const jsonDirectory = join(process.cwd(), 'json');

    const data = readFileSync(`${jsonDirectory}/survivors-data.json`, 'utf-8');
    const { survivors } = JSON.parse(data.toString()) as {
      survivors: SurvivorProps[];
    };

    const filteredSurvivors = survivors.filter((survivor) => {
      return survivor.isInfected === isInfected;
    });
    const count = filteredSurvivors.length;

    const lastPage = Math.ceil(count / limit);
    const nextPage = page + 1 <= lastPage ? page + 1 : undefined;

    return res.status(200).json({
      page,
      limit,
      next_page: nextPage,
      last_page: lastPage,
      survivors: filteredSurvivors.slice(startIndex, endIndex),
    });
  }

  return res.status(400);
}
