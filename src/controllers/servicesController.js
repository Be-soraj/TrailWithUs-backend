import Services from '../models/Services.js';

const validateServiceData = (data) => {
  if (!data.name || !data.price) {
    return { isValid: false, message: "Name and price are required" };
  }
  return { isValid: true };
};

export const createServices = async (req, res) => {
  try {
    const validation = validateServiceData(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }

    const service = await Services.create(req.body);

    res.status(201).json({
      success: true,
      data: service,
      message: 'Service created successfully'
    });
  } catch (error) {
    if (error.message.includes('duplicate key error')) {
      return res.status(400).json({
        success: false,
        message: 'Service with similar details already exists'
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: `Validation error: ${messages.join(', ')}`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error creating service',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getServices = async (req, res) => {
  try {
    const filter = {};
    if (req.query.destination) filter.destination = req.query.destination;
    if (req.query.minPrice) filter.price = { $gte: Number(req.query.minPrice) };

    let sortOption = {};
    if (req.query.sort === 'price-low-high') {
      sortOption = { price: 1 };
    } else if (req.query.sort === 'price-high-low') {
      sortOption = { price: -1 };
    } else if (req.query.sort === 'a-z') {
      sortOption = { name: 1 };
    }

    const services = await Services.find(filter).sort(sortOption);

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
      message: 'Services fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching services',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getServicesById = async (req, res) => {
  try {
    const service = await Services.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      data: service,
      message: 'Service fetched successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid service ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error fetching service',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const updateServices = async (req, res) => {
  try {
    const validation = validateServiceData(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }

    const updatedService = await Services.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updatedService,
      message: 'Service updated successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid service ID format'
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: `Validation error: ${messages.join(', ')}`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error updating service',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const deleteServices = async (req, res) => {
  try {
    const deletedService = await Services.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      data: deletedService,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid service ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error deleting service',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};