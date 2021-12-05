import { useState } from 'react';

const AddTodoForm = ({ addTodo }) => {
  const [newTodo, setTodo] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(newTodo);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 mb-10">
      <label htmlFor="todoInput" className="text-white">
        Task name:
        <input
          className="text-white bg-gray-700 ml-4 focus:outline-none"
          name="todoInput"
          type="text"
          value={newTodo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </label>
      <button
        type="submit"
        className="ml-4 px-4 font-bold text-white bg-blue-600 hover:bg-blue-800 "
      >
        +
      </button>
    </form>
  );
};

export default AddTodoForm;
