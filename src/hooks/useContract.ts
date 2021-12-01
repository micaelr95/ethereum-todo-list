import { ethers } from 'ethers';
import { useMemo } from 'react';

const useContract = <T extends ethers.Contract>(
  address: string,
  abi: ethers.ContractInterface,
  signerOrProvider?: ethers.Signer | ethers.providers.Provider | undefined
): T | null => {
  return useMemo(
    () => new ethers.Contract(address, abi, signerOrProvider) as T,
    [address, abi, signerOrProvider]
  );
};

export { useContract };
