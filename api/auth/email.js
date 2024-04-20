// pages/api/auth/email.js

import { signIn } from 'next-auth/react';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid input - missing fields or invalid email' });
  }

  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'No user found with this email' });
    }

    // Here you would typically compare passwords and handle authentication
    // For simplicity, let's assume authentication is successful

    await signIn('email', { email });
    
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
