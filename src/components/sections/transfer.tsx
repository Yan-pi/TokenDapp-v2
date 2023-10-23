import { useState } from "react";
import { InputText } from "../InputText";
import { InputNumber } from "../InputNumber";
import TokenRepository from "../../lib/repositories/tokenRepository";
import { Button } from "@/components/ui/button"

interface ITransferProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  tokenRepository: TokenRepository | undefined;
  fetchBalance: () => Promise<void>;
}

export function TransferSection({
  loading,
  setLoading,
  tokenRepository,
  fetchBalance,
}: ITransferProps) {
  const [transferAmount, setTransferAmount] = useState("");
  const [transferAddress, setTransferAddress] = useState("");

  async function handleTransferSubmit() {
    try {
      setLoading(true);
      const trx = await tokenRepository?.transfer(
        transferAddress,
        transferAmount,
      );
      await trx?.wait();
      setTransferAddress("");
      setTransferAmount("");
      await fetchBalance();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="#transfer">
      <div>
        <div>
          <p>🚀 Transfer Token</p>
        </div>
        {/* Address */}
        <InputText
          label="Address"
          placeholder="0x123..."
          value={transferAddress}
          onChange={(event) => {
            setTransferAddress(event.target.value);
          }}
        />
        <div>
          <InputNumber
            label="Amount"
            placeholder="100"
            value={transferAmount}
            onChange={(event) => {
              setTransferAmount(event.target.value);
            }}
          />
          <Button onClick={handleTransferSubmit}>
            {loading ? "..." : "Transfer"}
          </Button>
        </div>
      </div>
    </section>
  );
}