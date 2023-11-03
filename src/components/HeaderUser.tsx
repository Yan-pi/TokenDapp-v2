import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import UserProfile from "./UserProfile";
import { useContext } from "react";
import { DataContext } from "./context/DataContext/dataContext";

function HeaderUser({connect , totalSupply}: {connect : () => Promise<string[] | undefined>, totalSupply: string}) {
  const { walletAddress, balance} = useContext(DataContext);

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
                <UserProfile walletAddress = {walletAddress}/>
              </div>
            </>
          ) : (
            <Button onClick={connect}>Connect Wallet</Button>
          )}
        </div>
      </header>
  )
}

export default HeaderUser