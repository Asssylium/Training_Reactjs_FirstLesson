import React, { useState } from "react";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Item = styled.li`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 12px;
  border-radius: 10px;
  background: ${({ theme }) =>
    theme.background === "#f7f7f8" ? "#ffffff" : "rgba(255,255,255,0.02)"};
  border: 1px solid rgba(0, 0, 0, 0.04);
`;

const Left = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
  flex: 1;
`;

const TitleBlock = styled.div`
  min-width: 0;
`;

const Title = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;

const PriorityBadge = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  border-radius: 6px;
  padding: 2px 8px;
  margin-top: 4px;
  background: ${({ level }) =>
    level === "High"
      ? "#ef4444"
      : level === "Medium"
      ? "#eab308"
      : "#22c55e"};
`;

const Desc = styled.div`
  margin-top: 6px;
  color: ${({ theme }) => theme.subtle};
  font-size: 0.95rem;
  white-space: pre-wrap;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const IconBtn = styled.button`
  padding: 6px 8px;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.subtle};
`;

const SaveBtn = styled.button`
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.accent};
  color: white;
  cursor: pointer;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
`;

const EditTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  margin-top: 8px;
`;

const EditSelect = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  margin-top: 8px;
`;

function TaskList({ tasks = [], onToggle, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description || "");
    setEditPriority(task.priority || "Medium");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDesc("");
    setEditPriority("Medium");
  };

  const saveEdit = (id) => {
    if (!editTitle.trim()) {
      alert("Title cannot be empty.");
      return;
    }
    onEdit(id, editTitle, editDesc, editPriority);
    cancelEdit();
  };

  if (tasks.length === 0) {
    return (
      <p style={{ color: "gray", marginTop: 8 }}>
        No tasks yet — add one above.
      </p>
    );
  }

  return (
    <List aria-live="polite">
      {tasks.map((task) => (
        <Item key={task.id} aria-label={`Task ${task.title}`}>
          <Left>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              aria-label={`Mark ${task.title} ${
                task.completed ? "incomplete" : "complete"
              }`}
            />
            <TitleBlock>
              {editingId === task.id ? (
                <>
                  <EditInput
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    aria-label="Edit title"
                  />
                  <EditTextarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    rows={3}
                    aria-label="Edit description"
                  />
                  <EditSelect
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    aria-label="Edit priority"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </EditSelect>
                </>
              ) : (
                <>
                  <Title completed={task.completed}>{task.title}</Title>
                  <PriorityBadge level={task.priority}>
                    {task.priority || "Medium"}
                  </PriorityBadge>
                  {task.description && <Desc>{task.description}</Desc>}
                </>
              )}
            </TitleBlock>
          </Left>

          <Actions>
            {editingId === task.id ? (
              <>
                <SaveBtn onClick={() => saveEdit(task.id)}>Save</SaveBtn>
                <IconBtn onClick={cancelEdit} aria-label="Cancel edit">
                  Cancel
                </IconBtn>
              </>
            ) : (
              <>
                <IconBtn onClick={() => startEdit(task)} aria-label="Edit task">
                  ✏️
                </IconBtn>
                <IconBtn
                  onClick={() => onDelete(task.id)}
                  aria-label="Delete task"
                >
                  🗑️
                </IconBtn>
              </>
            )}
          </Actions>
        </Item>
      ))}
    </List>
  );
}

export default TaskList;
