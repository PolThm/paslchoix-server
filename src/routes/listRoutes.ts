import express from 'express';
import { getAllLists, getListById, createList } from '../controllers/listController';

const router = express.Router();

router.get('/lists', getAllLists);
router.get('/lists/:id', getListById);
router.post('/new-list', createList);

export default router;