// api/auth/resetPassword.js

import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';
import ResetToken from '../../models/ResetToken';

export default async function handler(req, res) {
  const { email, token, newPassword } = req.body;

  await dbConnect();

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the reset token
    const resetToken = await ResetToken.findOne({ token, user: user._id });

    if (!resetToken || resetToken.expiry < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Update user's password
    user.password = newPassword;
    await user.save();

    // Delete the reset token
    await ResetToken.findByIdAndDelete(resetToken._id);

    return res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
