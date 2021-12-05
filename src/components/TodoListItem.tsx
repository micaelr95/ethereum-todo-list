import { FC } from 'react';

const TodoListItem: FC<{
  name: string;
  isCompleted: boolean;
  completeTodo: (index: number) => {};
  index: number;
}> = ({ name, isCompleted, completeTodo, index }) => (
  <tr>
    <td>
      {!isCompleted && (
        <input
          type="checkbox"
          title="Complete task"
          className="mr-2"
          checked={isCompleted}
          onChange={() => completeTodo(index)}
        ></input>
      )}
    </td>
    <td className="text-white">{name}</td>
  </tr>
);

export default TodoListItem;
