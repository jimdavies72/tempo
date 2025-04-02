"use client";

import React from "react";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function AnimatedContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(container.current, { x: 0, opacity: 1 });
        return;
      }

      gsap.fromTo(
        container.current,
        { x: 100 },
        {
          x: 0,
          ease: "power2.inOut",
          duration: 1,
          scrollTrigger: {
            trigger: container.current,
            start: "top 90%",
            toggleActions: "play pause resume reverse",
            //markers: false,
          },
        },
      );
    },
    { scope: container },
  );

  return <div ref={container}>{children}</div>;
}
