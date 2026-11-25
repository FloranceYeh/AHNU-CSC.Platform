import { usePlatformInfo } from "@api/platform";
import LogoAnimate from "@assets/animates/logo-animate";
import managementLogo from "@assets/staff/management.svg";
// import NarrowTips from "@blocks/narrow-tips";
import { useNavigate, useSearchParams } from "@solidjs/router";
import { t } from "@storage/theme";
import Button from "@widgets/button";
import Card from "@widgets/card";
import Link from "@widgets/link";
import Popover from "@widgets/popover";
import { createEffect, type JSX, onMount, Show } from "solid-js";
import PlatformTitle from "./_blocks/platform-title";
// import Calendar from "./calendar";

function FooterCardLink(props: { href: string; label: string; children: JSX.Element }) {
  return (
    <Card contentClass="p-2">
      <Link
        href={props.href}
        ghost
        justify="start"
        class="flex h-auto! w-full flex-row items-center gap-4 py-1 pr-3 pl-2"
      >
        {props.children}
        <h2 class="min-w-0 max-w-52 wrap-anywhere text-xl font-bold">{props.label}</h2>
      </Link>
    </Card>
  );
}

export default function () {
  const platformInfo = usePlatformInfo();
  const [searchParams] = useSearchParams();
  let calendarSection: HTMLElement;
  const navigate = useNavigate();
  onMount(() => {
    if (searchParams.event) {
      try {
        const result = Number.parseInt(searchParams.event as string, 10);
        if (result) {
          setTimeout(() => {
            calendarSection!.scrollIntoView({ behavior: "smooth" });
          }, 1000);
        }
      } catch {
        // prevent lint
      }
    }
  });

  createEffect(() => {
    if (platformInfo.data?.zen_game) {
      navigate(`/games/${platformInfo.data.zen_game}`);
    }
  });

  return (
    <div class="flex-1 relative">
      <div class="absolute h-full w-full overflow-scroll snap-mandatory snap-y">
        <section class="h-full min-h-full snap-center flex flex-col items-center justify-center relative">
          <div class="flex-1" />
          <PlatformTitle name={platformInfo.data?.name || t("platform.name")} />
          <a
            class="mt-8 max-w-[calc(100%-2rem)] wrap-anywhere rounded-lg text-center text-xl text-error outline-3 outline-offset-4 outline-transparent transition-colors hover:outline-error/50 focus-visible:outline-current"
            href={platformInfo.data?.subject_url || "#"}
            target="_blank"
            rel="noreferrer"
          >
            {platformInfo.data?.subject_info || t("platform.subject")}
          </a>
          <div class="flex-1" />
          <div class="h-24" />
          <div class="absolute bottom-4 flex flex-row flex-wrap items-center justify-center h-auto p-2 space-x-2 opacity-60">
            <Button
              ghost
              class="inline-flex flex-row space-x-1 flex-wrap h-auto max-w-full rounded-2xl [&_a]:decoration-2 [&_a]:underline-offset-4"
            >
              <span>(C) 2022 - {new Date().getFullYear()}</span>
              <a class="hover:underline" href={platformInfo.data?.footer_url || "#"} target="_blank" rel="noreferrer">
                {platformInfo.data?.footer_info}
              </a>
              <Show when={platformInfo.data?.record}>
                <span class="opacity-40">|</span>
                <a class="hover:underline" href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">
                  {platformInfo.data?.record}
                </a>
              </Show>
            </Button>
            <Show when={!platformInfo.data?.hide_maker}>
              <Popover
                aria-label="about"
                class="rounded-2xl ring-primary/55 ring-inset hover:ring-2 focus-visible:ring-2 aria-expanded:ring-2"
                ghost
                popContentClass="p-2"
                square
                btnContent={<span class="shrink-0 icon-[fluent--info-20-regular] w-5 h-5" />}
              >
                <div class="w-max flex flex-col space-y-2">
                  <FooterCardLink href="/magic/about" label={platformInfo.data?.name || t("platform.name")}>
                    <LogoAnimate class="shrink-0" width={56} height={56} aria-hidden="true" />
                  </FooterCardLink>
                  <FooterCardLink href="/magic/staff" label={t("magic.staff.title")}>
                    <img class="size-14 shrink-0 object-contain" src={managementLogo} alt="" width={56} height={56} />
                  </FooterCardLink>
                  <Card contentClass="p-2">
                    <Link
                      href="https://qm.qq.com/q/lY9ap7YR68"
                      ghost
                      size="sm"
                      justify="start"
                      class="w-full"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span class="shrink-0 icon-[fluent--chat-20-regular] w-5 h-5" aria-hidden="true" />
                      <span>{t("about.groupChat")}</span>
                    </Link>
                  </Card>
                </div>
              </Popover>
            </Show>
          </div>
        </section>
      </div>
    </div>
  );
}
