import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RequestWithUser } from "../types/types";
import User from "../models/user";
import bcrypt from "bcrypt";

export const register = async (req: RequestWithUser, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.json({ message: 'Please enter all fields' });

    const existingUser = await User.findOne({$or: [{ username }, { email }]});
    if (existingUser) return res.json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
}

export const login = async (req: RequestWithUser, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.json({ message: 'Please enter all fields' });

    const user = await User.findOne({ username });
    if (!user) return res.json({ message: 'User does not exist' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.json({ message: 'Invalid credentials' });

    const payload = { id: user._id, username: user.username };
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: 86400 },
      (err, token) => {
        if (err) return res.json({message: err})
        return res.json({ message: 'Login successful', token: `Bearer ${token}`});
      });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
}

export const verifyJWT = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = (req.headers['x-access-token'] as string)?.split(' ')[1];
  if (!token) return res.status(401).json({ isLoggedIn: false, message: 'No token provided' });

  jwt.verify(token, process.env.PASSPORT_SECRET as string, (err, decoded: any) => {
    if (err) return res.status(401).json({ isLoggedIn: false, message: err })

    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'username' in decoded) {
      req.user = {
        id: decoded.id,
        username: decoded.username,
      };
      next();
    } else {
      return res.status(401).json({ isLoggedIn: false, message: 'Failed to authenticate' });
    }
  });
};

export const getUsername = (req: RequestWithUser, res: Response) => {
  verifyJWT(req, res, () => {});
  res.json({ isLoggedIn: true, username: req.user?.username });
}