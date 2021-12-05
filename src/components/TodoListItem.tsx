import { FC } from 'react';

const TodoListItem: FC<{
  name: string;
  isCompleted: boolean;
  completeTodo: (index: number) => {};
  index: number;
}> = ({ name, isCompleted, completeTodo, index }) => (
  <tr>
    <td className="text-white">{name}</td>
    <td>
      {!isCompleted && (
        <button
          className="ml-4 px-4 font-bold text-white bg-blue-600 hover:bg-blue-800"
          onClick={() => completeTodo(index)}
        >
          Complete
        </button>
      )}
    </td>
  </tr>
);

export default TodoListItem;
