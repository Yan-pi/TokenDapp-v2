import { useState } from "react";
import { InputNumber } from "../InputNumber";
import TokenRepository from "../../lib/repositories/tokenRepository";
import { Button } from "@/components/ui/button"

interface IBurnProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  tokenRepository: TokenRepository | undefined;
  fetchBalance: () => Promise<void>;
}

export function BurnSection({
  loading,
  setLoading,
  tokenRepository,
  fetchBalance,
}: IBurnProps) {
  const [burnAmount, setBurnAmount] = useState("");

  async function handleBurnSubmit() {
    try {
      setLoading(true);
      const trx = await tokenRepository?.burn(burnAmount);
      await trx?.wait();
      setBurnAmount("");
      await fetchBalance();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="#burn">
      <div>
        <h3>🔥 Burn Token</h3>
        <div>
          <InputNumber
            label="Amount"
            placeholder="100"
            value={burnAmount}
            onChange={(event) => {
              setBurnAmount(event.target.value);
            }}
          />
          <Button onClick={handleBurnSubmit}>{loading ? "..." : "Burn"}</Button>
        </div>
      </div>
    </section>
  );
}
