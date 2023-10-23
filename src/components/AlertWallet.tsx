import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";

function AlertWallet() {
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
  )
}

export default AlertWallet