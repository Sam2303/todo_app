import React, { useContext, useEffect, useState } from "react";
import { TodosContext } from "../context/TodosContext";
import injectSheet from "react-jss";

const Todo = (todo) => {
  todo = todo.todo;

  const { updateTodo, deleteTodo } = useContext(TodosContext);
  const updateStatusBtn = (status) => {
    console.log(todo);
    const updatedFields = {
      Name: todo.fields.Name,
      Difficulty: todo.fields.Difficulty,
      Status: status,
    };
    console.log(updatedFields);
    const updatedTodo = { id: todo.id, fields: updatedFields };
    updateTodo(updatedTodo);
  };

  const deleteBtn = (id) => {
    deleteTodo(id);
  };
  const buttonText = (status) => {
    if (status === "Todo" || status === "In progress") {
      return "Update";
    } else {
      return "Delete";
    }
  };

  return (
    <tr key={todo.id} className="tableRow">
      <td>{todo.fields.Name}</td>
      <td className="todoDiff">{todo.fields.Difficulty}</td>
      <td className="todoDiff">{todo.fields.Status}</td>
      <td>
        <button
          onClick={() => {
            if (todo.fields.Status === "Todo") {
              updateStatusBtn("In progress");
            } else if (todo.fields.Status === "In progress") {
              updateStatusBtn("Done");
            } else {
              deleteBtn(todo.id);
            }
          }}
          className="updateBtn"
        >
          {buttonText(todo.fields.Status)}
        </button>
      </td>
    </tr>
  );
};

export default Todo;
