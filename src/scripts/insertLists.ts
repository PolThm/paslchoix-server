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
      { id: "1", name: 'Juliette' },
      { id: "3", name: 'Eric' },
      { id: "4", name: 'Claire' },
      { id: "5", name: 'Laura' },
    ],
  },
  {
    _id: "65704fef8d9c8236611c3e42",
    name: 'Colocs',
    volunteers: [
      { id: "1", name: 'Angela' },
      { id: "2", name: 'Pol' },
      { id: "3", name: 'Maxime' },
      { id: "4", name: 'Jimmy' },
    ],
  },
  {
    _id: "65704fef8d9c8236611c3e43",
    name: 'Liste des cons',
    volunteers: [
      { id: "1", name: 'Donald Trump' },
      { id: "2", name: 'Vladimir Putin' },
      { id: "3", name: 'Marine Le Pen' },
      { id: "4", name: 'Kim Jong-un' },
      { id: "5", name: 'Maxime' },
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
