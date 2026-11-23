import { usePlatformInfo } from "@api/platform";
import LogoAnimate from "@assets/animates/logo-animate";
// import NarrowTips from "@blocks/narrow-tips";
import { useNavigate, useSearchParams } from "@solidjs/router";
import { t } from "@storage/theme";
import Button from "@widgets/button";
import Card from "@widgets/card";
import Link from "@widgets/link";
import Popover from "@widgets/popover";
import { createEffect, onMount, Show } from "solid-js";
// import Calendar from "./calendar";

function TitleBracket(props: { closing?: boolean }) {
  return (
    <svg class="inline-block h-[0.8em] w-[1ch] align-[-0.08em] text-primary" viewBox="0 0 16 24" aria-hidden="true">
      <path
        d={props.closing ? "M4 3H9Q11 3 11 5V19Q11 21 9 21H4" : "M12 3H7Q5 3 5 5V19Q5 21 7 21H12"}
        fill="none"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
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
          <h1 class="max-w-full wrap-anywhere text-center text-3xl font-bold opacity-80">
            &nbsp;&nbsp;
            <span>
              <TitleBracket />
              &nbsp;{platformInfo.data?.name || t("platform.name")}&nbsp;
              <TitleBracket closing />
            </span>
            &nbsp;
            <span
              class="inline-block h-[0.13em] w-[1ch] rounded-full bg-primary align-[-0.04em] motion-safe:animate-pulse"
              aria-hidden="true"
            />
          </h1>
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
                  <Card contentClass="p-2">
                    <Link ghost href="/magic/about" class="flex flex-row items-center h-auto! space-x-2 pl-2 pr-3 py-1">
                      <LogoAnimate class="shrink-0" width={56} height={56} />
                      <div class="flex min-w-0 flex-col">
                        <h2 class="max-w-52 wrap-anywhere text-xl font-bold">
                          {platformInfo.data?.name || t("platform.name")}
                        </h2>
                      </div>
                    </Link>
                  </Card>
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
