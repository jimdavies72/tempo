import { JSX } from "react";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import clsx from "clsx";

/**
 * Props for `Articles`.
 */
export type ArticlesProps = SliceComponentProps<Content.ArticlesSlice>;

/**
 * Component for "Articles" Slices.
 */
//const Articles: FC<ArticlesProps> = async ({ slice }) => {
const Articles = async ({ slice }: ArticlesProps): Promise<JSX.Element> => {
  const client = createClient();

  const articles = await Promise.all(
    slice.primary.article_group.map(async (item) => {
      if (isFilled.contentRelationship(item.article)) {
        return await client.getByID<Content.ArticleDocument>(item.article.id);
      }
    }),
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <h2 className="max-w-2xl text-center text-5xl font-medium text-balance md:text-7xl">
        <PrismicText field={slice.primary.heading} />
      </h2>

      <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="mt-20 grid gap-16">
        {articles.map(
          (article, index) =>
            article && (
              <div
                key={article.id}
                className="relative grid gap-4 opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
              >
                <div className="col-span-1 flex flex-col justify-center gap-4">
                  <h3 className="text-4xl">
                    <PrismicText field={article.data.heading} />
                  </h3>

                  <div className="max-w-md">
                    <PrismicRichText field={article.data.description} />
                  </div>

                  <PrismicNextLink
                    document={article}
                    className="after:absolute after:inset-0 hover:underline"
                  >
                    Read <PrismicText field={article.data.heading} /> Article
                    &gt;
                  </PrismicNextLink>
                </div>

                <PrismicNextImage
                  field={article.data.image}
                  quality={100}
                  className={clsx(
                    "lg-col-span-2 rounded-xl",
                    index % 2 && "md:-order-1",
                  )}
                />
              </div>
            ),
        )}
      </div>
    </Bounded>
  );
};

export default Articles;
