import {  useContext, useState } from "react";
import { InputNumber } from "../components/InputNumber";
import { InputText } from "../components/InputText";
import { Button } from "@/components/ui/button"
import { DataContext } from "@/components/context/DataContext/dataContext";

export function MintSection() {
  const [mintAmount, setMintAmount] = useState("");
  const [mintAddress, setMintAddress] = useState("");
  const {loading, setLoading, fetchBalance,tokenRepository } = useContext(DataContext);


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
