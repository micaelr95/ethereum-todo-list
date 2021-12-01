import { useWeb3React } from '@web3-react/core';
import { injected } from '../utils/Connectors';
import { shortenAddress } from '../utils/shortenAddress';

const Header = () => {
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
    <header className='flex items-center justify-end dark:bg-gray-900 h-16 p-4'>
      {active ? (
        <div>
          <span className='text-gray-900 dark:text-white mr-2'>
            Connected with <b>{shortenAddress(account)}</b>
          </span>
          <button
            onClick={disconnect}
            className='px-4 py-2 font-bold text-white bg-blue-600 hover:bg-blue-800'
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connect}
          className='px-4 py-2 font-bold text-white bg-blue-600 hover:bg-blue-800'
        >
          Connect to Metamask
        </button>
      )}
    </header>
  );
};

export default Header;
