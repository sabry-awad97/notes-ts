import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => (
  <header>
    <h1>{title}</h1>
    <div className="navbar">
      <p>
        <Link to="/">Home</Link> | <Link to="/notes/add">ADD Note</Link>
      </p>
    </div>
  </header>
);

export default Header;
