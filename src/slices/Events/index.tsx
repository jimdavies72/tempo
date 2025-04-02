import { FC } from "react";
import { asDate, Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import StarGrid from "@/components/StarGrid";

import { FaBowlFood } from "react-icons/fa6";
import AnimatedContent from "./AnimatedContent";

/**
 * Props for `Events`.
 */
export type EventsProps = SliceComponentProps<Content.EventsSlice>;

/**
 * Component for "Events" Slices.
 */
const Events: FC<EventsProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-center"
    >
      <div className="relative grid place-items-center text-center">
        <StarGrid />

        {isFilled.richText(slice.primary.heading) && (
          <div className="text-center text-5xl font-medium text-balance md:text-7xl">
            <PrismicRichText field={slice.primary.heading} />
          </div>
        )}

        {isFilled.richText(slice.primary.body) && (
          <div className="mt-4 max-w-lg text-lg text-balance text-yellow-500">
            <PrismicRichText field={slice.primary.body} />
          </div>
        )}
      </div>

      <div className="relative mt-16 space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent md:before:ml-[19.45rem] md:before:translate-x-0">
        {slice.primary.event_group.map((item, index) => (
          <div key={index} className="md:mx-auto md:w-[70%]">
            <div className="mb-3 md:ml-6.5 md:flex md:space-x-4">
              <div className="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
                {/* Icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-yellow-100/60 bg-orange-600 md:order-1">
                  <FaBowlFood className="text-2xl text-slate-300" />
                </div>
                {/* Date */}
                <time className="text-sm font-bold text-indigo-300 md:w-28">
                  {asDate(item.date)?.toLocaleDateString("en-GB")}
                </time>
              </div>
              {/* Title */}

              <div className="ml-14 text-left md:ml-0">
                <div className="flex flex-col place-items-baseline md:flex-row md:space-x-2">
                  <div className="text-md font-bold text-slate-400 md:text-xl">
                    <PrismicRichText field={item.event_name} />
                  </div>
                </div>
                <div>
                  <PrismicRichText field={item.location} />
                </div>
              </div>
            </div>
            {/* Card */}
            <AnimatedContent>
              <div className="mt-4 ml-14 grid rounded-sm border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 pt-2 pr-4 pb-4 pl-4 text-left backdrop-blur-sm md:ml-50">
                {item.date && asDate(item.date) < new Date() ? (
                  <p className="text-xl font-bold text-red-500">Past Event</p>
                ) : null}

                {isFilled.select(item.tickets) && (
                  <div className="text-md mb-2 font-bold md:text-lg">
                    {item.tickets == "Sold Out" ? (
                      <p className="text-red-500">Tickets {item.tickets}</p>
                    ) : (
                      <p className="text-green-500">Tickets {item.tickets}</p>
                    )}
                  </div>
                )}
                {isFilled.number(item.ticket_price) && (
                  <div className="text-md md:text-md mb-2 font-bold">
                    <p className="text-slate-400">
                      Ticket Price: £{item.ticket_price}
                    </p>
                  </div>
                )}

                <PrismicRichText
                  field={item.description}
                  components={{
                    heading3: ({ children }) => (
                      <h3 className="text-md mb-4 font-bold md:text-lg">
                        {children}
                      </h3>
                    ),
                    paragraph: ({ children }) => (
                      <p className="mb-2 text-sm text-slate-300">{children}</p>
                    ),
                    list: ({ children }) => (
                      <ul className="mb-7 pl-4 last:mb-0 md:pl-6">
                        {children}
                      </ul>
                    ),
                    listItem: ({ children }) => (
                      <li className="mb-1 list-disc pl-1 text-sm text-slate-300 last:mb-0 md:pl-2">
                        {children}
                      </li>
                    ),
                  }}
                />
              </div>
            </AnimatedContent>
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default Events;
