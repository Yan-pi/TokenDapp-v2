import { useState, useEffect } from "react";
import TokenRepository from "@/lib/repositories/tokenRepository";
import { Badge } from "@/components/ui/badge";
import UserProfile from "./../components/UserProfile";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";

function Header() {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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



  return (
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
              <UserProfile walletAddress={walletAddress} />
            </div>
          </>
        ) : (
          <Button onClick={connect}>Connect Wallet</Button>
        )}
      </div>
    </header>
  );
}

export default Header;
