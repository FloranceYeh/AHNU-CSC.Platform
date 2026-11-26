import { mediaPath } from "./media";

const logos = import.meta.glob<string>("../assets/staff/*.svg", { eager: true, import: "default", query: "?url" });

export const staffLogoNames = Object.keys(logos).map((path) => path.slice("../assets/staff/".length, -4));

export function staffLink(value?: string | null) {
  const link = value?.trim();
  if (!link || /[\\\s]/.test(link)) return undefined;
  if (link.startsWith("/") && !link.startsWith("//")) return link;
  if (URL.canParse(link) && ["https:", "http:"].includes(new URL(link).protocol)) return link;
}

export function staffLogo(value?: string | null) {
  const logo = value?.trim();
  if (!logo) return undefined;
  return logos[`../assets/staff/${logo}.svg`] ?? (/^[a-f0-9]{64}$/i.test(logo) ? mediaPath(logo) : staffLink(logo));
}
