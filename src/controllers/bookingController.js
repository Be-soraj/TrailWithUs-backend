import Booking from '../models/booking.js';
import Services from '../models/Services.js';

const validateBookingData = (data) => {
  const requiredFields = ['serviceId', 'customerName', 'customerEmail', 'NumberOfTicket'];
  const missingFields = requiredFields.filter(field => !data[field]);

  if (missingFields.length > 0) {
    return {
      isValid: false,
      message: `Missing required fields: ${missingFields.join(', ')}`
    };
  }

  if (isNaN(data.NumberOfTicket) || data.NumberOfTicket < 1) {
    return {
      isValid: false,
      message: 'NumberOfTicket must be a number and at least 1'
    };
  }

  return { isValid: true };
};

export const createBooking = async (req, res) => {
  try {
    const validation = validateBookingData(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }

    const service = await Services.findById(req.body.serviceId).select('price');
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    const totalPrice = service.price * req.body.NumberOfTicket;

    const booking = await Booking.create({
      serviceId: req.body.serviceId,
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      customerPhone: req.body.customerPhone,
      NumberOfTicket: req.body.NumberOfTicket,
      totalPrice: totalPrice
    });

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Booking created successfully'
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
      message: 'Server error creating booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('serviceId', 'name price') 
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
      message: 'Bookings fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching bookings',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('serviceId', 'name price'); 
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
      message: 'Booking fetched successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error fetching booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};