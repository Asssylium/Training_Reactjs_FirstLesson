import React from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  display:flex;
  gap:8px;
  margin:14px 0;
`;

const Btn = styled.button`
  padding:8px 10px;
  border-radius:8px;
  border:none;
  background: ${({ active, theme }) => (active ? theme.accent : "transparent")};
  color: ${({ active, theme }) => (active ? "#fff" : theme.subtle)};
  cursor:pointer;
`;

function TaskFilter({ filter, setFilter }) {
  const options = ["All", "Active", "Completed"];
  return (
    <FilterContainer role="tablist" aria-label="Filter tasks">
      {options.map(o => (
        <Btn
          key={o}
          onClick={() => setFilter(o)}
          active={filter === o}
          role="tab"
          aria-selected={filter === o}
        >
          {o}
        </Btn>
      ))}
    </FilterContainer>
  );
}

export default TaskFilter;
