import List from '../models/listModel';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { verifyJWT } from "./UserController";
import { RequestWithUser } from "../types/types";

export const getAllLists = async (req: RequestWithUser, res: Response) => {
  verifyJWT(req, res, async () => {
    try {
      const lists = await List.find({ owner: req.user?.username });
      res.json(lists);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({message: error.message});
      } else {
        res.status(500).json({message: 'An unknown error occurred'});
      }
    }
  });
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

export const createList = async (req: RequestWithUser, res: Response) => {
  verifyJWT(req, res, async () => {
    try {
      const list = new List({
        name: req.body.name,
        owner: req.user?.username,
        volunteers: req.body.volunteers,
      });
      const newList = await list.save();
      res.status(201).json(newList);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  });
};

export const deleteList = async (req: RequestWithUser, res: Response) => {
  verifyJWT(req, res, async () => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
      const list = await List.findById(id);
      if (list && list.owner === req.user?.username) {
        await List.findByIdAndDelete(id);
        res.json({ message: 'List successfully deleted' });
      } else {
        res.status(404).json({ message: 'List not found or you are not the owner' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  });
};

export const updateList = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const list = await List.findById(id);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    const updatedList = await List.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedList);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};
