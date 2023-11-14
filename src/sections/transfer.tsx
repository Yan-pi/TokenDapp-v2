import { useContext, useState } from "react";
import { InputText } from "../components/InputText";
import { InputNumber } from "../components/InputNumber";
import { Button } from "@/components/ui/button"
import { DataContext } from "@/components/context/DataContext/dataContext";

export function TransferSection() {
  const [transferAmount, setTransferAmount] = useState("");
  const [transferAddress, setTransferAddress] = useState("");
  
  const {loading, setLoading, fetchBalance,tokenRepository} = useContext(DataContext);
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
