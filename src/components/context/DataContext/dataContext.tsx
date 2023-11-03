import TokenRepository from "@/repositories/tokenRepository";
import { createContext, useEffect, useState, ReactNode } from "react";
import { ethers } from "ethers";

export interface IDataContext {
  loading: boolean;
  walletAddress: string;
  balance: string;
  provider: ethers.providers.Web3Provider | undefined;
  tokenRepository: TokenRepository | undefined;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setWalletAddress: (walletAddress: string) => void;
  setBalance: (balance: string) => void;
  fetchBalance: () => Promise<void>;
}

export const DataContext = createContext<IDataContext>({
  loading: false,
  walletAddress: "",
  balance: "",
  provider: undefined,
  tokenRepository: undefined,
  setLoading: () => {},
  setWalletAddress: () => {},
  setBalance: () => {},
  fetchBalance: () => { return new Promise<void>(() => {}) },
})

export function DataContextProvider({ children }: { children: ReactNode }){
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >();
  const [tokenRepository, setTokenRepository] = useState<TokenRepository>();


  
  // Get the metamask provider
  function getProvider() {
    if (window.ethereum !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const windowEthereum: any = window.ethereum;
      // Get the provider and signer from the browser window
      const provider = new ethers.providers.Web3Provider(windowEthereum);
      return provider;
    }
  }

  // Saving provider in state
  useEffect(() => {
    setProvider(getProvider());
    console.log(import.meta.env.VITE_TOKEN_ADDRESS);
  }, []);

  
  // If provider exists, initiate the token repository
  useEffect(() => {
    if (provider) {
      const tokenRepository = new TokenRepository(provider);
      setTokenRepository(tokenRepository);
    }
  }, [provider]);

  useEffect(() => {
    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenRepository, walletAddress]);

  async function fetchBalance() {
    try {
      setBalance("...");
      const _balance = await tokenRepository?.balanceOf(walletAddress);
      console.log(_balance);
      setBalance(_balance || "");
    } catch (e) {
      console.log(e);
    }
  }

  
  return(
    <DataContext.Provider value={
      {
        loading,
        walletAddress,
        balance,
        provider,
        tokenRepository,
        setLoading,
        setWalletAddress,
        setBalance,
        fetchBalance
      }
    }>
      { children }
    </DataContext.Provider>
  )
}