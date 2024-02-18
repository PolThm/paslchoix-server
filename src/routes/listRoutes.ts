import express from 'express';
import {
  getAllLists,
  getListById,
  createList,
  deleteList,
  updateList
} from '../controllers/ListController';

const router = express.Router();

router.get('/lists', getAllLists);
router.get('/lists/:id', getListById);
router.post('/new-list', createList);
router.delete('/delete-list/:id', deleteList);
router.put('/update-list/:id', updateList);

export default router;