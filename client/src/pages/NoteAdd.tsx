import React, { useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { saveNote } from '../api/api';

interface Props {}

const NoteAdd: React.FC<Props> = () => {
  const [formData, setFormData] = useState({
    key: '',
    title: '',
    body: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { key, title, body } = formData;
    const data = { key, title, body };
    await saveNote(data);
    navigate('/notes/view?key=' + key);
  };

  return (
    <>
      <Header title={'Add a Note'} />
      <form method="POST" onSubmit={handleSubmit}>
        <p>
          Key:{' '}
          <input
            type="text"
            name="key"
            value={formData.key}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Title:{' '}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </p>
        <br />
        <textarea
          rows={5}
          cols={40}
          name="body"
          value={formData.body}
          onChange={handleInputChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default NoteAdd;
