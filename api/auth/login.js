// pages/api/auth/login.js

import { verifyPassword } from '../../../utils/auth';
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
    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Here you can set up user sessions or JWT tokens
    
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
