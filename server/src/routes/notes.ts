import express from 'express';
import { NotesStore as notes } from '../app.js';
import { INote } from '../models/Notes.js';
export const router = express.Router();

// Save Note
router.post<{}, INote, INote>('/save', async (req, res, next) => {
  const { key, title, body } = req.body;
  try {
    const note = await notes.create(key, title, body);
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// Update Note
router.put<unknown, INote, INote>('/save/:key', async (req, res, next) => {
  const { key, title, body } = req.body;
  try {
    const note = await notes.update(key, title, body);
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// Read Note
router.get<{}, INote, {}, { key: string }>('/view', async (req, res, next) => {
  console.log(req.query.key);

  try {
    let note = await notes.read(req.query.key);
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// Delete Note
router.delete<{}, INote, {}, { key: string | undefined }>(
  '/destroy',
  async (req, res, next) => {
    try {
      const key = req.query.key as string | undefined;
      if (!key) {
        throw new Error('Missing key parameter');
      }
      const note = await notes.destroy(key);
      res.json(note);
    } catch (err) {
      next(err);
    }
  }
);
