import React from "react";

const Nav = () => {
  return (
    <div className="navBar">
      <h1>Todo App</h1>
      <a href="/manageTodos">Manage my Todos</a>
      <a href="/calender">My Diary</a>

      <a href="/login">Login</a>
    </div>
  );
};

export default Nav;
