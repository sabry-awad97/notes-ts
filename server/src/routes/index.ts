import express from 'express';
import { NotesStore as notes } from '../app.js';
import { INote } from '../models/Notes.js';
export const router = express.Router();

/* GET home page. */
router.get<unknown, { notes: INote[] }>('/', async (req, res, next) => {
  try {
    const keyList = await notes.keyList();
    const keyPromises = keyList.map(key => {
      return notes.read(key);
    });
    res.json({ notes: await Promise.all(keyPromises) });
  } catch (err) {
    next(err);
  }
});
