import mongoose from 'mongoose';
import { Volunteer, List } from '../types/types';

const volunteerSchema = new mongoose.Schema<Volunteer>({
  id: Number,
  name: String,
  target: String,
});

const listSchema = new mongoose.Schema<List>({
  id: Number,
  name: String,
  volunteers: [volunteerSchema],
});

const ListModel = mongoose.model<List>('List', listSchema);

export default ListModel;
