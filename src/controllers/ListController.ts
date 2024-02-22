import List from '../models/listModel';
import { Request, Response } from 'express';
import mongoose from 'mongoose'

export const getAllLists = async (req: Request, res: Response) => {
  try {
    const owner = req.query.owner;
    let query = {};
    if (owner) query = { owner: owner.toString() };
    const lists = await List.find(query);
    res.json(lists);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};


export const getListById = async (req: Request, res: Response) => {
  try {
    const list = await List.findById(req.params.id);
    if (list) {
      res.json(list);
    } else {
      res.status(404).json({ message: 'List not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const createList = async (req: Request, res: Response) => {
  try {
    const list = new List({
      id: req.body.id,
      name: req.body.name,
      owner: req.body.owner,
      volunteers: req.body.volunteers,
    });
    const newList = await list.save();
    res.status(201).json(newList);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};

export const deleteList = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log('Deleting list with ID:', id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const list = await List.findById(id);
    if (list) {
      await List.findByIdAndDelete(id);
      res.json({ message: 'List successfully deleted' });
    } else {
      res.status(404).json({ message: 'List not found' });
    }
  } catch (error) {
    console.log('Error in deleteList:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

export const updateList = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const list = await List.findById(id);
    if (list) {
      const updatedList = await List.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedList);
    } else {
      res.status(404).json({ message: 'List not found' });
    }
  } catch (error) {
    console.log('Error in updateList:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
}

