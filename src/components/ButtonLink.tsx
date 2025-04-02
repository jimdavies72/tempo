import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export default function ButtonLink({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        "after:bg-opacity-0 after:hover:bg-opacity-15 relative inline-flex h-fit w-fit rounded-full border border-blue-100/20 bg-blue-200/10 px-4 py-2 text-blue-200 outline-none after:inset-0 after:-z-10 after:rounded-full after:bg-yellow-100 after:blur-md after:transition-all after:duration-500 hover:border-yellow-200/40 hover:text-yellow-300 focus:ring-2",
        className,
      )}
      {...restProps}
    />
  );
}
