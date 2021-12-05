import Head from 'next/head';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';

import Header from '../components/Header';
import { useContract } from '../hooks/useContract';
import TodoListContract from '../../artifacts/contracts/TodoList.sol/TodoList.json';
import AddTodoForm from '../components/AddTodoForm';
import Todo from '../Interfaces/todo';
import { CONTRACT_ADDRESS } from '../constants/addresses';
import TodoList from '../components/TodoList';

const CONTRACT_ABI = TodoListContract.abi;

const Index = () => {
  const { active, account, library } = useWeb3React<Web3Provider>();
  const contract = useContract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    library?.getSigner()
  );
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (active) {
      contract.on('NewTodo', eventHandler);
      contract.on('TodoCompleted', eventHandler);

      getTodos();
    }
  }, [active]);

  const eventHandler = (address: string, todoList: Todo[]) => {
    setTodos(todoList);
  };

  const getTodos = async () => {
    const count = await contract.getTodosCount();

    const newTodoList: Todo[] = [];
    for (let index = 0; index < count.toNumber(); index++) {
      const todo = await contract.getTodo(index);
      newTodoList.push({ name: todo.name, isCompleted: todo.isCompleted });
    }
    setTodos(newTodoList);
  };

  const addTodo = async (newTodo: string) => {
    const transaction = await contract.addTodo(newTodo);
    await transaction.wait();
  };

  const completeTodo = async (id: number) => {
    const transaction = await contract.completeTodo(id);
    await transaction.wait();
  };

  return (
    <div>
      <Head>
        <title>Ethereum Todo List Dapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-col items-center bg-white dark:bg-gray-800 h-screen">
        {active && (
          <>
            <AddTodoForm addTodo={addTodo} />
            <TodoList todos={todos} completeTodo={completeTodo} />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
