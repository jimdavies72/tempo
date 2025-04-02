import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import Bounded from "@/components/Bounded";

import {
  FaSquareInstagram,
  FaSquareFacebook,
  FaSquareXTwitter,
  FaSquarePinterest,
  FaSquareYoutube,
  FaTiktok,
  FaLinkedin,
  FaSquareGithub,
} from "react-icons/fa6";

const icons = {
  instagram: <FaSquareInstagram />,
  facebook: <FaSquareFacebook />,
  x: <FaSquareXTwitter />,
  pinterest: <FaSquarePinterest />,
  youtube: <FaSquareYoutube />,
  tiktok: <FaTiktok />,
  linkedin: <FaLinkedin />,
  github: <FaSquareGithub />,
};

/**
 * Props for `SocialStrip`.
 */
export type SocialStripProps = SliceComponentProps<Content.SocialStripSlice>;

/**
 * Component for "SocialStrip" Slices.
 */
const SocialStrip: FC<SocialStripProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-8"
    >
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading3: ({ children }) => (
            <h2 className="mx-auto w-full border-t border-slate-600 py-3 text-center text-2xl font-medium text-balance md:text-3xl">
              {children}
            </h2>
          ),
        }}
      />

      <div className="mx-auto mt-2 flex flex-col items-center justify-between gap-5 md:flex-row">
        {slice.primary.social_group.map((item, index) => (
          <div key={index} className="text-3xl text-balance md:text-5xl">
            <PrismicNextLink field={item.link}>
              {item.icon && icons[item.icon]}
            </PrismicNextLink>
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default SocialStrip;
