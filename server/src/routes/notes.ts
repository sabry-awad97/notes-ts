import express from 'express';
import { NotesStore as notes } from '../app.js';
import { INote } from '../models/Notes.js';

enum NoteAPI {
  GET_NOTES = '/',
  SAVE_NOTE = '/save',
  UPDATE_NOTE = '/save/:key',
  READ_NOTE = '/view',
  DELETE_NOTE = '/destroy',
}

export const router = express.Router();

router.get<unknown, { notes: INote[] }>(
  NoteAPI.GET_NOTES,
  async (req, res, next) => {
    try {
      const keyList = await notes.keyList();
      const keyPromises = keyList.map(key => {
        return notes.read(key);
      });
      res.json({ notes: await Promise.all(keyPromises) });
    } catch (err) {
      next(err);
    }
  }
);

// Save Note
router.post<{}, INote, INote>(NoteAPI.SAVE_NOTE, async (req, res, next) => {
  const { key, title, body } = req.body;
  try {
    const note = await notes.create(key, title, body);
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// Update Note
router.put<unknown, INote, INote>(
  NoteAPI.UPDATE_NOTE,
  async (req, res, next) => {
    const { key, title, body } = req.body;
    try {
      const note = await notes.update(key, title, body);
      res.json(note);
    } catch (err) {
      next(err);
    }
  }
);

// Read Note
router.get<{}, INote, {}, { key: string }>(
  NoteAPI.READ_NOTE,
  async (req, res, next) => {
    console.log(req.query.key);

    try {
      let note = await notes.read(req.query.key);
      res.json(note);
    } catch (err) {
      next(err);
    }
  }
);

// Delete Note
router.delete<{}, INote, {}, { key: string | undefined }>(
  NoteAPI.DELETE_NOTE,
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
