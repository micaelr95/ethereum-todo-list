import Head from 'next/head';
import { useWeb3React } from '@web3-react/core';

import { injected } from '../utils/Connectors';
import Header from '../components/Header';

export default function Home() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
    } catch (err) {
      console.log(err);
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Head>
        <title>Ethereum Todo List Dapp</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header></Header>
      <main className='flex flex-col items-center justify-center bg-white dark:bg-gray-800 h-screen'></main>
    </div>
  );
}
