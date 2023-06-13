import React, { useEffect, useState } from 'react';
import { INote } from '../types';
import Header from './Header';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { updateNote, readNote } from '../api/api';

interface Props {}

const NoteEdit: React.FC<Props> = () => {
  const [note, setNote] = useState<INote>({
    key: '',
    title: '',
    body: '',
  });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const key = searchParams.get('key');

    const getNote = async () => {
      if (key) {
        const note = await readNote(key);
        console.log(note);

        setNote(note);
      }
    };

    getNote();
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { key } = note;
    await updateNote(note);
    navigate('/notes/view?key=' + key);
  };

  return (
    <>
      <Header title={`Edit ${note?.title}`} />
      <form method="POST" onSubmit={handleSubmit}>
        <p>
          Key:{' '}
          <input
            type="text"
            name="key"
            value={note.key}
            onChange={handleInputChange}
          />
          <input type="hidden" name="key" value={note ? note.key : ''} />
        </p>
        <p>
          Title:{' '}
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleInputChange}
          />
        </p>
        <br />
        <textarea
          rows={5}
          cols={40}
          name="body"
          value={note.body}
          onChange={handleInputChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default NoteEdit;
