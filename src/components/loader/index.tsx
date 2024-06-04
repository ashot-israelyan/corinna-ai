import { FC, PropsWithChildren } from "react";
import { Spinner } from "../spinner";
import { cn } from "@/lib/utils";

type LoaderProps = {
  loading: boolean;
  className?: string;
  noPadding?: boolean;
};

export const Loader: FC<PropsWithChildren<LoaderProps>> = ({
  loading,
  children,
  noPadding,
  className,
}) => {
  return loading ? (
    <div className={cn(className || "w-full py-5 flex justify-center")}>
      <Spinner noPadding={noPadding} />
    </div>
  ) : (
    children
  );
};
