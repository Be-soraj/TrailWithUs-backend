import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  customerPhone: {
    type: String,
    required: false,
    trim: true
  },
  NumberOfTicket: {
    type: Number,
    required: true,
    min: 1,
    max: 20
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

bookingSchema.virtual('serviceDetails', {
  ref: 'Service',
  localField: 'serviceId',
  foreignField: '_id',
  justOne: true
});


bookingSchema.pre('save', async function(next) {
  if (!this.totalPrice || this.isModified('NumberOfTicket')) {
    const service = await this.model('Service').findById(this.serviceId);
    if (service) {
      this.totalPrice = service.price * this.NumberOfTicket;
    }
  }
  next();
});

export default model('Booking', bookingSchema);