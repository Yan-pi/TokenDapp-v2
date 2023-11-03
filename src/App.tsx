/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { MintSection } from "./sections/mint";
import { BurnSection } from "./sections/burn";
import { TransferSection } from "./sections/transfer";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { DataContext } from "./components/context/DataContext/dataContext";
import HeaderUser from "./components/HeaderUser";

function App() {
  const {provider, tokenRepository, setLoading, setWalletAddress} = useContext(DataContext);
  const [totalSupply, setTotalSupply] = useState("");

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
      <HeaderUser  
      connect={connect} 
      totalSupply={totalSupply}
      />

      {/* SECTIONS */}
      <div>
        {/* MINT */}
        <MintSection/>

        {/* Burn */}
        <BurnSection/>

        {/* Transfer */}
        <TransferSection/>
      </div>
    </div>
  );
}

export default App;
