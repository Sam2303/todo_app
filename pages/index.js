import Head from "next/head";
import { table, minifyRecords } from "./api/utils/Airtable-todo";
import Todo from "../components/Todo";
import Nav from "../components/Nav";
import React, { useEffect, useState, useContext } from "react";
import { TodosContext } from "../context/TodosContext";

export default function Home(initialTodos) {
  const { todos, setTodos, addTodo } = useContext(TodosContext);
  useEffect(() => {
    setTodos(initialTodos.initialTodos);
  }, []);

  const addNewTask = () => {
    let Name = prompt("What is the task?", "Todo");
    let Difficulty = prompt(
      "How Difficult do you find this usually?",
      "Easy, Medium, Hard"
    );
    if(Name !== "" && Difficulty !== "" && Name !== null && Difficulty !== null ){
      addTodo(Name, Difficulty, "Todo");
    }else alert("Please Enter something in all fields")
  };

  return (
    <div>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="todoTableContainer">
        <table>
          <thead>
            <tr className="tableRow">
              <th>Name</th>
              <th>Difficulty</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
        </table>
        <button className="addTodoBtn" onClick={() => addNewTask()}>
          <span>&#43;</span> Add New Task
        </button>
        <table>
          <tbody>
            {todos &&
              todos.map((todo) => {
                return <Todo key={todo.id} todo={todo} />;
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const todos = await table.select({}).firstPage();
    return {
      props: {
        initialTodos: minifyRecords(todos),
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: "Something went wrong",
      },
    };
  }
}
