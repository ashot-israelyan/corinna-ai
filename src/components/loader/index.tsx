import { FC, PropsWithChildren } from "react";
import { Spinner } from "../spinner";

type LoaderProps = {
  loading: boolean;
};

export const Loader: FC<PropsWithChildren<LoaderProps>> = ({
  loading,
  children,
}) => {
  return loading ? (
    <div className="w-full py-5 flex justify-center">
      <Spinner />
    </div>
  ) : (
    children
  );
};
