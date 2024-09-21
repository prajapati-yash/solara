import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/utils/connectToDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { worldId, walletAddress } = req.body;

  if (!worldId || !walletAddress) {
    return res.status(400).json({ message: 'World ID and wallet address are required' });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    const result = await collection.updateOne(
      { worldId: worldId },
      { 
        $setOnInsert: { worldId: worldId },
        $addToSet: { walletAddresses: walletAddress }
      },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      res.status(201).json({ message: 'User created and wallet address added' });
    } else if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Wallet address added to existing user' });
    } else {
      res.status(200).json({ message: 'Wallet address already exists for this user' });
    }
  } catch (error) {
    console.error('Error saving wallet address:', error);
    res.status(500).json({ message: 'Error saving wallet address' });
  }
}