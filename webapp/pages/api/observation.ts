import type { NextApiRequest, NextApiResponse } from 'next'

const MAIN_API_URL = process.env.MAIN_API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(MAIN_API_URL + '/observation'); // Fetching from the server-side API route
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // console.log('response:', response)
    const data = await response.json();
    res.status(200).json(data)
  } catch (error) {
    console.error('There was an error!', error);
  }
}
