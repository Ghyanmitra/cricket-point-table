import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team name is required'],
    unique: true,
  },
  matches: {
    type: Number,
    default: 0,
  },
  won: {
    type: Number,
    default: 0,
  },
  lost: {
    type: Number,
    default: 0,
  },
  tied: {
    type: Number,
    default: 0,
  },
  points: {
    type: Number,
    default: 0,
  },
  nrr: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);