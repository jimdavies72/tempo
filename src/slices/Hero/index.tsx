import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import ButtonLink from "@/components/ButtonLink";
import Bounded from "@/components/Bounded";
import StarGrid from "@/components/StarGrid";
import AnimatedContent from "./AnimatedContent";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-center"
    >
      <AnimatedContent slice={slice} />
    </Bounded>
  );
};

export default Hero;
