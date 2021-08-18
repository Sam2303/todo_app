import React, {useContext} from "react";
import { TodosContext } from "../context/TodosContext";

const Todo = (todo) => {
  todo = todo.todo;

  const {updateTodo, deleteTodo} = useContext(TodosContext);
  const completeBtn = () => {
    console.log(todo);
    const updatedFields = {
      Name: todo.fields.Name,
      Difficulty: todo.fields.Difficulty,
      Status: "Done"
    };
    console.log(updatedFields);
    const updatedTodo = { id: todo.id, fields: updatedFields };
    updateTodo(updatedTodo);
  };
  return (
    <tr key={todo.id}>
      <td>{todo.fields.Name}</td>
      <td>{todo.fields.Difficulty}</td>
      <td>{todo.fields.Status}</td>
      <button onClick={completeBtn}>Complete</button>
    </tr>
  );
};

export default Todo;
