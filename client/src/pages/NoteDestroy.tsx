import React, { useEffect, useState } from 'react';
import { INote } from '../types';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { deleteNote, readNote } from '../api/api';
interface Props {}

const NoteDestroy: React.FC<Props> = () => {
  const [note, setNote] = useState<INote>({
    key: '',
    title: '',
    body: '',
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const key = searchParams.get('key');

    const getNote = async () => {
      if (key) {
        const note = await readNote(key);
        setNote(note);
      }
    };

    getNote();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { key } = note;
    await deleteNote(key);
    navigate('/');
  };
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <input type="hidden" value={note.key} />
      <p>Delete {note && note.title}?</p>
      <br />
      <input type="submit" />
      <Link to={`/notes/view?key=${note.key}`}>Cancel</Link>
    </form>
  );
};

export default NoteDestroy;
