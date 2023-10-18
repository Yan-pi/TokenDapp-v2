/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { MintSection } from "./sections/mint";
import { BurnSection } from "./sections/burn";
import { TransferSection } from "./sections/transfer";
import TokenRepository from "./repositories/tokenRepository";
import { ethers } from "ethers";
import UserProfile from "./components/UserProfile";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function App() {
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [balance, setBalance] = useState("");
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >();
  const [tokenRepository, setTokenRepository] = useState<TokenRepository>();

  // Connect wallet to application
  async function connect(): Promise<string[] | undefined> {
    if (window.ethereum) {
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[] | undefined;

      console.log(accounts);

      if (accounts && accounts.length) {
        setWalletAddress(accounts[0]);
      }

      return accounts;
    }
  }

  // Get the metamask provider
  function getProvider() {
    if (window.ethereum !== undefined) {
      const windowEthereum: any = window.ethereum;
      // Get the provider and signer from the browser window
      const provider = new ethers.providers.Web3Provider(windowEthereum);
      return provider;
    }
  }

  useEffect(() => {
    async function fetchTotalSupply() {
      try {
        setLoading(true);
        const supply = await tokenRepository?.totalSupply();
        setTotalSupply(supply || "");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTotalSupply();
  }, [tokenRepository, setLoading]);

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

  useEffect(() => {
    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenRepository, walletAddress]);

  // If no provider was set, that means metamask is not active or not installed
  if (!provider) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white rounded-lg p-2 shadow-lg">
          <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Metamask not installed</AlertTitle>
            <AlertDescription>
              Please install Metamask to use this application.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  // Returning the page content
  return (
    <div className="flex flex-col m-6 mx-10">
      {/* HEADER */}
      <header className="mb-14">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="font-bold text-3xl my-4 ">Pie Token</h1>
            <Badge variant="secondary" className="text-sm text-muted-foreground">
              <p>Total Supply: {totalSupply || "..."} LTK</p>
            </Badge>
          </div>
          {walletAddress ? (
            <>
              <div className="flex ">
                <div className="flex flex-col gap-3 items-end">
                  <Badge variant="secondary" className="p-3 font-mono text-sm">
                    {" "}
                    {walletAddress}
                  </Badge>
                  <Badge className="p-2"> Saldo: {balance || "..."} PIE</Badge>
                </div>
                <UserProfile walletAddress = {walletAddress}/>
              </div>
            </>
          ) : (
            <Button onClick={connect}>Connect Wallet</Button>
          )}
        </div>
      </header>

      {/* SECTIONS */}
      <div>
        {/* MINT */}
        <MintSection
          loading={loading}
          setLoading={setLoading}
          tokenRepository={tokenRepository}
          fetchBalance={fetchBalance}
        />

        {/* Burn */}
        <BurnSection
          loading={loading}
          setLoading={setLoading}
          tokenRepository={tokenRepository}
          fetchBalance={fetchBalance}
        />

        {/* Transfer */}
        <TransferSection
          loading={loading}
          setLoading={setLoading}
          tokenRepository={tokenRepository}
          fetchBalance={fetchBalance}
        />
      </div>
    </div>
  );
}

export default App;
