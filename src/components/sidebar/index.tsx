'use client';

import { FC } from "react";
import useSideBar from "@/context/use-sidebar";
import { cn } from "@/lib/utils";

type Props = {
  domains: {
    id: string;
    name: string;
    icon: string;
  }[] | null | undefined;
}

const Sidebar: FC<Props> = ({ domains }) => {
  const { expand, onExpand, page, onSignOut } = useSideBar();

  return (
    <div className={cn('bg-cream h-full w-[60px] fill-mode-forwards fixed md:relative',
      expand === undefined && '',
      expand === true
        ? 'animate-open-sidebar'
        : expand === false && 'animate-close-sidebar'
    )}
    >
      
    </div>
  );
};

export default Sidebar;
