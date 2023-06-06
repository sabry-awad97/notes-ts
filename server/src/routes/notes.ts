import express from 'express';
import { NotesStore as notes } from '../app.js';
import { Note } from '../models/Notes.js';
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

// Save Note (update)
router.post<
  {},
  {},
  {
    docreate: 'create' | 'update';
    notekey: string;
    title: string;
    body: string;
  }
>('/save', async (req, res, next) => {
  try {
    let note: Note;
    if (req.body.docreate === 'create') {
      note = await notes.create(
        req.body.notekey,
        req.body.title,
        req.body.body
      );
    } else {
      note = await notes.update(
        req.body.notekey,
        req.body.title,
        req.body.body
      );
    }
    res.redirect('/notes/view?key=' + note.key);
  } catch (err) {
    next(err);
  }
});

router.get<{}, {}, {}, { key: string }>('/view', async (req, res, next) => {
  try {
    let note = await notes.read(req.query.key);
    res.render('noteview', {
      title: note ? note.title : '',
      notekey: req.query.key,
      note: note,
    });
  } catch (err) {
    next(err);
  }
});

router.get<{}, {}, {}, { key: string }>('/edit', async (req, res, next) => {
  try {
    let note = await notes.read(req.query.key);
    res.render('noteedit', {
      title: note ? 'Edit ' + note.title : 'Add a Note',
      docreate: false,
      notekey: req.query.key,
      note: note,
    });
  } catch (err) {
    next(err);
  }
});

router.get<{}, {}, {}, { key: string }>('/destroy', async (req, res, next) => {
  try {
    let note = await notes.read(req.query.key);
    res.render('notedestroy', {
      title: note ? note.title : '',
      notekey: req.query.key,
      note: note,
    });
  } catch (err) {
    next(err);
  }
});

// Really destroy note (destroy)
router.post<{}, {}, { notekey: string }>(
  '/destroy/confirm',
  async (req, res, next) => {
    try {
      await notes.destroy(req.body.notekey);
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  }
);
