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
      { id: "1", name: 'Juliette', target: '4', hasDrawn: false },
      { id: "2", name: 'Eric', target: '1', hasDrawn: false },
      { id: "3", name: 'Claire', target: '2', hasDrawn: false },
      { id: "4", name: 'Laura', target: '3', hasDrawn: false },
    ],
  },
  {
    _id: "65704fef8d9c8236611c3e42",
    name: 'Colocs',
    volunteers: [
      { id: "1", name: 'Angela', target: '2', hasDrawn: false },
      { id: "2", name: 'Pol', target: '1', hasDrawn: false },
      { id: "3", name: 'Maxime', target: '4', hasDrawn: false },
      { id: "4", name: 'Jimmy', target: '3', hasDrawn: false },
    ],
  },
  {
    _id: "65704fef8d9c8236611c3e43",
    name: 'Liste des cons',
    volunteers: [
      { id: "1", name: 'Donald Trump', target: '4', hasDrawn: false },
      { id: "2", name: 'Vladimir Putin', target: '1', hasDrawn: false },
      { id: "3", name: 'Marine Le Pen', target: '2', hasDrawn: false },
      { id: "4", name: 'Kim Jong-un', target: '5', hasDrawn: false },
      { id: "5", name: 'Maxime', target: '4', hasDrawn: false },
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
