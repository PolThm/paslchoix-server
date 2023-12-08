import mongoose from 'mongoose';
import dotenv from 'dotenv';
import List from '../models/ListModel';

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('The MONGODB_URI must be defined in the .env file');
}

mongoose.connect(uri);

const myLists = [
  {
    _id: "65704fef8d9c8236611c3e41",
    name: 'Famille André',
    volunteers: [
      { id: "1", name: 'Juliette', isTargeted: false },
      { id: "3", name: 'Eric', isTargeted: false },
      { id: "4", name: 'Claire', isTargeted: false },
      { id: "5", name: 'Laura', isTargeted: false },
    ],
  },
  {
    _id: "65704fef8d9c8236611c3e42",
    name: 'Colocs',
    volunteers: [
      { id: "1", name: 'Angela', isTargeted: false },
      { id: "2", name: 'Pol', isTargeted: false },
      { id: "3", name: 'Maxime', isTargeted: false },
      { id: "4", name: 'Jimmy', isTargeted: false },
    ],
  },
  {
    _id: "65704fef8d9c8236611c3e43",
    name: 'Liste des cons',
    volunteers: [
      { id: "1", name: 'Donald Trump', isTargeted: false },
      { id: "2", name: 'Vladimir Putin', isTargeted: false },
      { id: "3", name: 'Marine Le Pen', isTargeted: false },
      { id: "4", name: 'Kim Jong-un', isTargeted: false },
      { id: "5", name: 'Maxime', isTargeted: false },
    ],
  },
];

async function insertLists() {
  try {
    await List.insertMany(myLists);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data', error);
  } finally {
    await mongoose.disconnect();
  }
}

insertLists();
