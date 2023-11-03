import { useContext, useState } from "react";
import { InputNumber } from "../components/InputNumber";
import { Button } from "@/components/ui/button"
import { DataContext } from "@/components/context/DataContext/dataContext";

export function BurnSection() {
  const [burnAmount, setBurnAmount] = useState("");

  const {loading, setLoading, fetchBalance,tokenRepository } = useContext(DataContext);
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
