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

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
      message: 'Users fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.status(200).json({
      success: true,
      data: user,
      message: 'User fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from URL
    const { firstName, lastName, email, jobTitle, gender } = req.body;

    // Basic validation
    if (!firstName || !email) {
      return res.status(400).json({
        success: false,
        message: "First name and email are required",
      });
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, jobTitle, gender },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: deletedUser,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};