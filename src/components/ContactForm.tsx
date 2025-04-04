"use client";

import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

export default function ContactForm({
  service_id,
  template_id,
  public_key,
}: {
  service_id: string;
  template_id: string;
  public_key: string;
}) {
  const form = useRef<HTMLFormElement>(null);
  const methods = useForm();
  const { register, reset, handleSubmit } = methods;

  const sendEmail = () => {
    if (form.current) {
      emailjs
        .sendForm(service_id || "", template_id || "", form.current, {
          publicKey: public_key || "",
        })
        .then(
          () => {
            toast.success("Your message has been sent!");
          },
          (error) => {
            toast.error(`An error occured: ${error.text}`);
          },
        );
    } else {
      console.error("Form element is not defined");
    }
  };

  const onSubmit = handleSubmit((data) => {
    if (data.cc_email.length === 0) {
      sendEmail();
    } else {
      // honey trapped
      toast.success("Your message has been sent.");
    }

    reset();
  });

  return (
    <div className="flex flex-row gap-4 rounded-lg bg-[#070815] p-4">
      <FormProvider {...methods}>
        <form
          ref={form}
          onSubmit={(e) => e.preventDefault()}
          noValidate
          className="w-full"
        >
          <div className="mb-5">
            <label
              htmlFor="user_name"
              className="mb-1 block text-left text-base font-medium text-slate-300"
            >
              Full Name *
            </label>
            <input
              type="text"
              placeholder="John Doe"
              autoComplete="off"
              {...register("user_name", {
                required: {
                  value: true,
                  message: "required",
                },
              })}
              className="w-full rounded-sm border border-yellow-400/70 bg-[#070815] px-3 py-1.5 text-base font-medium text-white outline-none focus:border-blue-500/40 focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="user_email"
              className="mb-1 block text-left text-base font-medium text-slate-300"
            >
              Email *
            </label>
            <input
              type="email"
              placeholder="example@domain.com"
              autoComplete="off"
              {...register("user_email", {
                required: {
                  value: true,
                  message: "required",
                },
              })}
              className="w-full rounded-sm border border-yellow-400/70 bg-[#070815] px-3 py-1.5 text-base font-medium text-white outline-none focus:border-blue-500/40 focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="subject"
              className="mb-1 block text-left text-base font-medium text-slate-300"
            >
              Subject *
            </label>
            <input
              type="text"
              placeholder="Re: Food Preparation"
              autoComplete="off"
              {...register("subject", {
                required: {
                  value: true,
                  message: "required",
                },
              })}
              className="w-full rounded-sm border border-yellow-400/70 bg-[#070815] px-3 py-1.5 text-base font-medium text-white outline-none focus:border-blue-500/40 focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="message"
              className="mb-1 block text-left text-base font-medium text-slate-300"
            >
              Message *
            </label>
            <textarea
              placeholder="Type your message"
              rows={4}
              autoComplete="off"
              {...register("message", {
                required: {
                  value: true,
                  message: "required",
                },
              })}
              className="w-full rounded-sm border border-yellow-400/70 bg-[#070815] px-3 py-1.5 text-base font-medium text-white outline-none focus:border-blue-500/40 focus:shadow-md"
            />
          </div>

          {/* honey trap field */}
          <div className="-z-1 h-0 w-0 opacity-0">
            <label htmlFor="cc_email">CC Email</label>
            <input
              type="text"
              autoComplete="off"
              {...register("cc_email")}
              className="text-black"
            />
          </div>

          <div className="pr-4 text-right">
            <button
              onClick={onSubmit}
              className="relative inline-flex h-fit w-fit rounded-full border border-blue-100/20 bg-blue-200/10 px-4 py-2 text-blue-200 ring-yellow-300 transition-colors outline-none after:absolute after:inset-0 after:-z-10 hover:animate-pulse after:rounded-full after:bg-yellow-100/0 after:blur-md after:transition-all after:duration-500 hover:border-yellow-200/40 hover:text-yellow-300 hover:bg-yellow-100/15 focus:ring-1"
            >
              Send Email
            </button>
          </div>
        </form>
      </FormProvider>
      <Toaster
        toastOptions={{
          style: {
            background: "#070815",
          },
        }}
        richColors
        expand={false}
        position="bottom-right"
      />
    </div>
  );
}
