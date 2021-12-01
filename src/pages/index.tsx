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

  return (
    <div>
      <Head>
        <title>Ethereum Todo List Dapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 h-screen">
      </main>
    </div>
  );
}
