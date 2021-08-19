import { createContext, useState } from "react";

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const refreshTodos = async () => {
    try {
      const res = await fetch("/api/GetTodos");
      const latestTodos = await res.json();
      setTodos(latestTodos);
    } catch (err) {
      console.log(err);
    }
  };

  const addTodo = async (Name, Difficulty, Status) => {
    try {
      console.log(Name, Difficulty, Status)
      const res = await fetch("/api/CreateTodo", {
        method: "POST",
        body: JSON.stringify({ Name, Difficulty, Status }),
        headers: { "content-type": "application/json" },
      });
      const newTodo = await res.json();
      setTodos((prevTodos) => {
        return [newTodo, ...prevTodos];
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateTodo = async (updatedTodo) => {
    console.log(updatedTodo);
    const id = updatedTodo.id;
    const Name = updatedTodo.fields.Name;
    const Difficulty = updatedTodo.fields.Difficulty;
    const Status = updatedTodo.fields.Status;
    try {
      const res = await fetch("/api/UpdateTodo", {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: { "content-type": "application/json" },
      });
      setTodos((prevTodos) => {
        const existingTodos = [...prevTodos];
        const existingTodo = existingTodos.find(
            (todo) => todo.id === updatedTodo.id
        );
        existingTodo.fields = updatedTodo.fields;
        return existingTodos;
    });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch("/api/DeleteTodo", {
        method: "Delete",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        refreshTodos,
        updateTodo,
        deleteTodo,
        addTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosContext, TodosProvider };
