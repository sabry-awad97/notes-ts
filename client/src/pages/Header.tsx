import React from 'react';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => (
  <header>
    <h1>{title}</h1>
    <div className="navbar">
      <p>
        <a href="/">Home</a> | <a href="/notes/add">ADD Note</a>
      </p>
    </div>
  </header>
);

export default Header;
