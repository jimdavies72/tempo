import TempoLogo from "@/components/TempoLogo";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const footerSettings = await client.getSingle("footer_settings");

  return (
    <footer className="flex flex-col items-center justify-between gap-6 border-t border-slate-600 px-8 py-7 md:flex-row">
      <Link href="/">
        <TempoLogo />
        <span className="sr-only">{settings.data.site_title}</span>
      </Link>
      <nav aria-label="Footer" className="flex flex-col gap-6 md:flex-row">
        <ul className="flex flex-col items-center gap-6 md:flex-row">
          {settings.data.navigation.map((item) => (
            <li key={item.label}>
              <PrismicNextLink
                field={item.link}
                className="inline-flex min-h-11 items-center"
              >
                {item.label}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col items-center gap-6 md:flex-row">
          {footerSettings.data.links.map((item) => (
            <li key={item.label}>
              <PrismicNextLink
                field={item.link}
                className="inline-flex min-h-11 items-center"
              >
                {item.label}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
