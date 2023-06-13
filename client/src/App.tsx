import { Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import NoteEdit from './pages/NoteEdit';
import NoteView from './pages/NoteView';
import NoteAdd from './pages/NoteAdd';
import NoteDestroy from './pages/NoteDestroy';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/notes/add" element={<NoteAdd />}></Route>
        <Route path="/notes/edit" element={<NoteEdit />}></Route>
        <Route path="/notes/view" element={<NoteView />}></Route>
        <Route path="/notes/destroy" element={<NoteDestroy />}></Route>
      </Routes>
    </>
  );
}

export default App;
