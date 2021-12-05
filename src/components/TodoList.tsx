import { FC } from 'react';

import Todo from '../Interfaces/todo';
import TodoListItem from './TodoListItem';

const TodoList: FC<{ todos: Todo[]; completeTodo: (index: number) => {} }> = ({
  todos,
  completeTodo,
}) => (
  <table>
    <thead>
      <tr>
        <th></th>
        <th className="text-white">Name</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(({ name, isCompleted }, index) => (
        <TodoListItem
          key={`${name}-${index}`}
          name={name}
          isCompleted={isCompleted}
          completeTodo={completeTodo}
          index={index}
        />
      ))}
    </tbody>
  </table>
);

export default TodoList;
