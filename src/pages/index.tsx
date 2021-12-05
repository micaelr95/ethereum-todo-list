import Head from 'next/head';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';

import Header from '../components/Header';
import { useContract } from '../hooks/useContract';
import TodoListContract from '../../artifacts/contracts/TodoList.sol/TodoList.json';

const contractAddress = '0x6440a610bc426c75bbd237ef53a832c82e527f7d';
const contractABI = TodoListContract.abi;

export default function Home() {
  const { active, account, library } = useWeb3React<Web3Provider>();
  const contract = useContract(
    contractAddress,
    contractABI,
    library?.getSigner()
  );
  const [newTodo, setTodo] = useState('');
  const [todos, setTodos] = useState<{ name: string; isCompleted: boolean }[]>(
    []
  );

  useEffect(() => {
    if (active) {
      getTodos();
    }
  }, [active]);

  const getTodos = async () => {
    const count = await contract.getTodosCount();

    setTodos([]);
    for (let index = 0; index < count.toNumber(); index++) {
      const todo = await contract.getTodo(index);
      setTodos([...todos, { name: todo.name, isCompleted: todo.isCompleted }]);
    }
  };

  const addTodo = async (newTodo: string) => {
    const transaction = await contract.addTodo(newTodo);
    await transaction.wait();
    getTodos();
  };

  const completeTodo = async (id: number) => {
    const transaction = await contract.completeTodo(id);
    await transaction.wait();
    getTodos();
  };

  return (
    <div>
      <Head>
        <title>Ethereum Todo List Dapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 h-screen">
        {active && (
          <>
            <AddTodoForm addTodo={addTodo} />
            <table>
              <thead>
                <tr>
                  <th className="text-white">Name</th>
                  <th className="text-white">Completed</th>
                </tr>
              </thead>
              <tbody>
                {todos.map(({ name, isCompleted }, index) => (
                  <tr key={`${name}-${index}`}>
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
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
}
