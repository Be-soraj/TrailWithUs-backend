import User from '../models/User.js';

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, jobTitle, gender } = req.body;
    
    // Basic validation
    if (!firstName || !email) {
      return res.status(400).json({
        success: false,
        message: 'First name and email are required'
      });
    }

    // Create user in database
    const user = await User.create({
      firstName,
      lastName,
      email,
      jobTitle,
      gender
    });

    res.status(201).json({
      success: true,
      data: user,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};