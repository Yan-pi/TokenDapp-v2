import {  useState } from "react";
import { InputNumber } from "../InputNumber";
import { InputText } from "../InputText";
import TokenRepository from "../../lib/repositories/tokenRepository";
import { Button } from "@/components/ui/button"

interface IMintProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  tokenRepository: TokenRepository | undefined;
  fetchBalance: () => Promise<void>;
}

export function MintSection({
  loading,
  setLoading,
  tokenRepository,
  fetchBalance,
}: IMintProps) {
  const [mintAmount, setMintAmount] = useState("");
  const [mintAddress, setMintAddress] = useState("");
 

  async function handleMintSubmit() {
    try {
      setLoading(true);
      const trx = await tokenRepository?.mint(mintAddress, mintAmount);
      await trx?.wait();
      setMintAddress("");
      setMintAmount("");
      await fetchBalance();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="#mint">
      <div>
        <div>
          <p>💰 Mint Token</p>
        </div>
        {/* Address */}
        <InputText
          label="Address"
          placeholder="0x123..."
          value={mintAddress}
          onChange={(event) => {
            setMintAddress(event.target.value);
          }}
        />
        <div>
          <InputNumber
            label="Amount"
            placeholder="100"
            value={mintAmount}
            onChange={(event) => {
              setMintAmount(event.target.value);
            }}
          />
          <Button onClick={handleMintSubmit}>{loading ? "..." : "Mint"}</Button>
        </div>
      </div>
    </section>
  );
}
