import React, { useEffect, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import TaskStats from "./components/TaskStats";

const lightTheme = {
  background: "#f7f7f8",
  card: "#ffffff",
  text: "#111827",
  subtle: "#6b7280",
  accent: "#2563eb",
  danger: "#ef4444"
};

const darkTheme = {
  background: "#0b1220",
  card: "#0f1724",
  text: "#e6eef8",
  subtle: "#9aa6bd",
  accent: "#60a5fa",
  danger: "#fb7185"
};

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  html,body,#root { height:100%; }
  body {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    padding: 24px;
  }
  button { font-family: inherit; }
`;

const Container = styled.main`
  max-width: 760px;
  margin: 0 auto;
  background: ${({ theme }) => theme.card};
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
`;

const Header = styled.header`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  margin: 0;
`;

const Controls = styled.div`
  display:flex;
  gap: 8px;
  align-items:center;
`;

const ToggleBtn = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.06);
  background: transparent;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("ptm_tasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("ptm_dark");
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });



  useEffect(() => {
    localStorage.setItem("ptm_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("ptm_dark", JSON.stringify(darkMode));
  }, [darkMode]);

  const addTask = (title, description, priority = "Medium") => {
  const trimmed = title.trim();
  if (!trimmed) return;
  if (tasks.some(t => t.title.toLowerCase() === trimmed.toLowerCase())) {
    alert("A task with the same title already exists.");
    return;
  }
  const newTask = {
    id: Date.now(),
    title: trimmed,
    description: description?.trim() || "",
    completed: false,
    priority, // 🟡 Add this
    createdAt: new Date().toISOString()
  };
  setTasks(prev => [...prev, newTask]);
};

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    if (!window.confirm("Delete this task?")) return;
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const editTask = (id, newTitle, newDescription) => {
    const trimmed = newTitle.trim();
    if (!trimmed) {
      alert("Task title cannot be empty.");
      return;
    }
    // prevent duplicate title (except for same task)
    if (tasks.some(t => t.id !== id && t.title.toLowerCase() === trimmed.toLowerCase())) {
      alert("Another task has the same title.");
      return;
    }
    setTasks(prev => prev.map(t => t.id === id ? { ...t, title: trimmed, description: newDescription?.trim() || "" } : t));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === "Active") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Container role="application" aria-labelledby="app-title">
        <Header>
          <Title id="app-title">Personal Task Manager</Title>
          <Controls>
            <ToggleBtn
              onClick={() => setDarkMode(d => !d)}
              aria-pressed={darkMode}
              title="Toggle dark mode"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </ToggleBtn>
          </Controls>
        </Header>

        <TaskForm onAdd={addTask} />

        <TaskFilter filter={filter} setFilter={setFilter} />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleComplete}
          onDelete={deleteTask}
          onEdit={editTask}
        />

        <TaskStats tasks={tasks} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
