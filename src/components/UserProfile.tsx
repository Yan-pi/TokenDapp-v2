import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggle";

function UserProfile(props: { walletAddress: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="m-2 cursor-pointer ">
          <AvatarImage src="" />
          <AvatarFallback>{props.walletAddress.slice(0, 3)}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Settings</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <ModeToggle/>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default UserProfile;
