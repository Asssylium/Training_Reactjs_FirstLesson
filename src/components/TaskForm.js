import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.08);
`;

const Textarea = styled.textarea`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.08);
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.08);
`;

const Button = styled.button`
  padding: 10px;
  background: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium"); // 🟡 Add state

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(title, description, priority);
    setTitle("");
    setDescription("");
    setPriority("Medium");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <Select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        aria-label="Select task priority"
      >
        <option value="Low">🟢 Low</option>
        <option value="Medium">🟡 Medium</option>
        <option value="High">🔴 High</option>
      </Select>
      <Button type="submit">Add Task</Button>
    </Form>
  );
}

export default TaskForm;
