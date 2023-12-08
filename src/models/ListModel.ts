import mongoose from 'mongoose';
import { Volunteer, List } from '../types/types';

const volunteerSchema = new mongoose.Schema<Volunteer>({
  id: String,
  name: String,
  target: String,
  isTargeted: Boolean,
});

const listSchema = new mongoose.Schema<List>({
  id: String,
  name: String,
  volunteers: [volunteerSchema],
});

const ListModel = mongoose.model<List>('List', listSchema);

export default ListModel;
