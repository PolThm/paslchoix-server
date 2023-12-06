import express from 'express';
import { getAllLists, getListById, createList, deleteList } from '../controllers/listController';

const router = express.Router();

router.get('/lists', getAllLists);
router.get('/lists/:id', getListById);
router.post('/new-list', createList);
router.delete('/delete-list/:id', deleteList);

export default router;