"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL!;

type Todo = { id: number; title: string; done: boolean };

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    const { data } = await axios.get<Todo[]>(`${API}/todos`);
    setTodos(data);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    setError("");
    try {
      const { data } = await axios.post<Todo>(`${API}/todos`, { todo: { title } });
      setTodos([...todos, data]);
      setTitle("");
    } catch (e) {
      setError("Create failed");
    }
  };

  const toggle = async (t: Todo) => {
    const { data } = await axios.patch<Todo>(`${API}/todos/${t.id}`, { todo: { done: !t.done } });
    setTodos(todos.map(x => (x.id === t.id ? data : x)));
  };

  const remove = async (id: number) => {
    await axios.delete(`${API}/todos/${id}`);
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Todos</h1>
      <input
        data-testid="new-title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New todo"
      />
      <button data-testid="add-btn" onClick={add}>Add</button>
      {error && <p data-testid="error">{error}</p>}
      <ul data-testid="todo-list">
        {todos.map(t => (
          <li data-testid="todo-item" key={t.id}>
            <label>
              <input
                data-testid="toggle"
                type="checkbox"
                checked={t.done}
                onChange={() => toggle(t)}
              />
              {t.title}
            </label>
            <button data-testid="del-btn" onClick={() => remove(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
