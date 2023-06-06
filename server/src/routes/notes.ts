import express from 'express';
import { NotesStore as notes } from '../app.js';
export const router = express.Router();

// Add Note. (create)
router.get('/add', (req, res, next) => {
  res.render('noteedit', {
    title: 'Add a Note',
    docreate: true,
    notekey: '',
    note: undefined,
  });
});
