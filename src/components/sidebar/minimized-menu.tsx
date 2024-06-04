import { SIDE_BAR_MENU } from "@/constants/menu";
import { MenuLogo } from "@/icons/menu-logo";
import { FC } from "react";
import MenuItem from "./menu-item";
import DomainMenu from "./domain-menu";
import { LogOut, MonitorSmartphone } from "lucide-react";

type MinMenuProps = {
  onShrink(): void;
  current: string;
  onSignOut(): void;
  domains:
    | {
        id: string;
        name: string;
        icon: string | null;
      }[]
    | null
    | undefined;
};

const MinMenu: FC<MinMenuProps> = ({
  onShrink,
  current,
  onSignOut,
  domains,
}) => {
  return (
    <div className="p-3 flex flex-col items-center h-full">
      <span className="animate-fade-in opacity-0 delay-300 fill-mode-forwards cursor-pointer">
        <MenuLogo onClick={onShrink} />
      </span>
      <div className="animate-fade-in opacity-0 delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col">
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem size="min" {...menu} key={key} current={current} />
          ))}
          <DomainMenu min domains={domains} />
        </div>
        <div className="flex flex-col">
          <MenuItem
            size="min"
            label="Sign out"
            icon={<LogOut />}
            onSignOut={onSignOut}
          />
          <MenuItem
            size="min"
            label="Mobile App"
            icon={<MonitorSmartphone />}
          />
        </div>
      </div>
    </div>
  );
};

export default MinMenu;
