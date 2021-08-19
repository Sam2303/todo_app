import React, {useContext} from "react";
import { TodosContext } from "../context/TodosContext";

const Todo = (todo) => {
  todo = todo.todo;


  const {updateTodo, deleteTodo} = useContext(TodosContext);
  const updateStatusBtn = (status) => {
    console.log(todo);
    const updatedFields = {
      Name: todo.fields.Name,
      Difficulty: todo.fields.Difficulty,
      Status: status
    };
    console.log(updatedFields);
    const updatedTodo = { id: todo.id, fields: updatedFields };
    updateTodo(updatedTodo);
  };

const deleteBtn = (id) => {
  deleteTodo(id);
}
const buttonText = (status) => {
  if (status === "Todo" || status === "In progress"){return "Update"}
  else {return "Delete"} 
}

  return (
    <tr key={todo.id}>
      <td>{todo.fields.Name}</td>
      <td>{todo.fields.Difficulty}</td>
      <td>{todo.fields.Status}</td>
      <td><button onClick={() => {
        if(todo.fields.Status === "Todo"){updateStatusBtn("In progress")}
        else if(todo.fields.Status === "In progress"){updateStatusBtn("Done")}
        else{deleteBtn(todo.id)}
      }}>{buttonText(todo.fields.Status)}</button></td>
    </tr>
  );
};

export default Todo;
