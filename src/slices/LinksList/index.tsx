import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { PrismicNextLink } from "@prismicio/next";
import HyperSpoonLogo from "@/components/HyperSpoonLogo";
import Link from "next/link";

/**
 * Props for `LinksList`.
 */
export type LinksListProps = SliceComponentProps<Content.LinksListSlice>;

/**
 * Component for "LinksList" Slices.
 */
const LinksList: FC<LinksListProps> = ({ slice }) => {
  let wdLink = "/";
  if (process.env.WEDEV_LINK !== "") {
    wdLink = `https://${process.env.WEDEV_LINK}/`;
  }
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="w-full border-b border-slate-600 pb-10">
        <p>This website is powered by...</p>
        <Link href={wdLink} target="_blank">
          <HyperSpoonLogo />
        </Link>
      </div>
      <div className="mt-8 text-center">
        {slice.primary.links.map((item) => (
          <div key={item.label}>
            {/* {item.link_type} */}
            <div className="mb-4 cursor-pointer text-lg whitespace-nowrap text-yellow-200 no-underline md:text-xl">
              <PrismicNextLink field={item.link}>{item.label}</PrismicNextLink>
            </div>
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default LinksList;
