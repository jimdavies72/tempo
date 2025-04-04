import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import StarGrid from "@/components/StarGrid";
import ContactForm from "@/components/ContactForm";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */
const Contact: FC<ContactProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-center"
    >
      <div className="relative">
        <StarGrid />
        {isFilled.richText(slice.primary.heading) && (
          <div className="text-center text-5xl font-medium text-balance md:text-7xl">
            <PrismicRichText field={slice.primary.heading} />
          </div>
        )}

        {isFilled.richText(slice.primary.body) && (
          <div className="mx-auto mt-6 max-w-md text-balance text-yellow-300">
            <PrismicRichText field={slice.primary.body} />
          </div>
        )}

        <div className="glass-container mt-16 w-full">
          <div className="absolute inset-0 -z-10 bg-blue-500/30 blur-2xl filter" />
          {slice.primary.form_enabled ? (
            <ContactForm
              service_id={process.env.EMAILJS_SERVICE_ID || ""}
              template_id={process.env.EMAILJS_TEMPLATE_ID || ""}
              public_key={process.env.EMAILJS_PUBLIC_KEY || ""}
            />
          ) : (
            <div className="flex w-full flex-row justify-center gap-4 rounded-lg bg-[#070815] p-4 text-slate-300">
              <h3>Contact form is temporarily unavailable</h3>
            </div>
          )}
        </div>

        {/* Alternative Contact Details */}
        <div className="mt-16">
          {slice.primary.alternative_contacts.length > 0 && (
            <div className="text-left">
              {isFilled.richText(slice.primary.alternatives_heading) && (
                <div className="mb-8 text-xl font-medium text-balance md:text-2xl">
                  <PrismicRichText field={slice.primary.alternatives_heading} />
                </div>
              )}

              <div className="text-slate-200">
                {slice.primary.alternative_contacts.map((item, index) => (
                  <div key={index} className="text-md mb-2 md:text-lg">
                    <p>
                      {item.label}: {item.value}{" "}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Bounded>
  );
};

export default Contact;
