import { Schema, model } from 'mongoose';

const highlightsSchema = new Schema({
  title: {
    type: String,
    required: false,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  }
}, { _id: false });

const itinerarySchema = new Schema({
  day: {
    type: Number,
    required: false
  },
  title: {
    type: String,
    required: false,
    trim: true
  },
  description: {
    type: [String],
    required: false
  },
  amenities: {
    type: [String],
    required: false
  }
}, { _id: false });

const tourPlanSchema = new Schema({
  title: {
    type: String,
    required: false,
    trim: true
  },
  itinerary: {
    type: [itinerarySchema],
    required: false
  }
}, { _id: false });

const locationSchema = new Schema({
  title: {
    type: String,
    required: false,
    trim: true
  },
  first_description: {
    type: String,
    required: false,
    trim: true
  },
  mapEmbed: {
    type: String,
    required: false,
    trim: true
  },
  second_description: {
    type: String,
    required: false,
    trim: true
  }
}, { _id: false });

const galleryImageSchema = new Schema({
  image: {
    type: String,
    required: false,
    trim: true
  },
  colSpan: {
    type: Number,
    required: false
  },
  rowSpan: {
    type: Number,
    required: false
  }
}, { _id: false });

const gallerySchema = new Schema({
  galleryDescription: {
    type: String,
    required: false,
    trim: true
  },
  images: {
    type: [galleryImageSchema],
    required: false
  }
}, { _id: false });

const informationSchema = new Schema({
  infoDescription: {
    type: String,
    required: false,
    trim: true
  },
  highlights: {
    type: [highlightsSchema],
    required: false
  }
}, { _id: false });

const servicesSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  priceUnit: {
    type: String,
    required: false,
    trim: true
  },
  departure_date: {
    type: Date,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  participants: {
    type: Number,
    min: 0,
    default: 0
  },
  image: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: false
  },
  destination: {
    type: String,
    required: false,
    trim: true
  },
  countryCode: {
    type: String,
    require:false,
    trim: true,
  },
  reviewCount: {
    type: Number,
    min: 0,
    required: false,
  },
  information: {
    type: informationSchema,
    required: false,
  },
  tourPlan: {
    type: tourPlanSchema,
    required: false,
  },
  location: {
    type: locationSchema,
    required: false,
  },
  gallery: {
    type: gallerySchema,
    required: false,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
}, {
  timestamps: true, _id: true
});

servicesSchema.index({ name: 'text', description: 'text' });

export default model('Service', servicesSchema, 'services');