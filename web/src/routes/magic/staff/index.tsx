import { Title } from "@storage/header";
import { fullTheme, t } from "@storage/theme";
import Divider from "@widgets/divider";
import Tag from "@widgets/tag";
import { OverlayScrollbarsComponent } from "overlayscrollbars-solid";
import { For, Show } from "solid-js";

export default function StaffPage() {
  const platform = usePlatformInfo();

  return (
    <>
      <Title page={t("magic.staff.title")} route="/magic/staff" />
      <div class="relative flex-1">
        <div class="absolute h-full w-full overflow-scroll snap-mandatory snap-y">
          <section class="h-full min-h-full snap-center flex flex-col items-center justify-center relative p-3">
            <OverlayScrollbarsComponent
              options={{ scrollbars: { theme: `os-theme-${fullTheme()}`, autoHide: "scroll" } }}
              class="absolute inset-0 print:static"
              defer
            >
              <main class="flex min-h-full justify-center px-3 py-9">
                <div class="my-auto flex w-full max-w-3xl flex-col gap-12">
                  <h1 class="sr-only">{t("magic.staff.title")}</h1>
                  <For
                    each={platform.data?.staff_editions}
                    fallback={
                      <Show when={platform.isSuccess}>
                        <p class="text-center opacity-60">{t("magic.staff.empty")}</p>
                      </Show>
                    }
                  >
                    {(edition) => (
                      <section class="flex flex-col gap-6">
                        <header class="flex items-center gap-6">
                          <Show when={staffLogo(edition.logo)}>
                            {(logo) => (
                              <img class="size-20 shrink-0 object-contain" src={logo()} alt="" width={80} height={80} />
                            )}
                          </Show>
                          <h2 class="min-w-0 wrap-anywhere text-3xl font-bold">{edition.title}</h2>
                        </header>
                        <Divider class="w-full" />
                        <div class="grid gap-8 sm:grid-cols-2">
                          <For each={edition.groups}>
                            {(group) => (
                              <section
                                class="flex min-w-0 items-start gap-4"
                                classList={{ "col-span-full": group.full_width }}
                              >
                                <Show when={staffLogo(group.logo)}>
                                  {(logo) => (
                                    <img
                                      class="size-20 shrink-0 object-contain"
                                      src={logo()}
                                      alt=""
                                      width={80}
                                      height={80}
                                    />
                                  )}
                                </Show>
                                <div class="min-w-0 space-y-2">
                                  <h3 class="wrap-anywhere text-xl font-bold">{group.name}</h3>
                                  <ul class="flex flex-wrap gap-2">
                                    <For each={group.members}>
                                      {(member, index) => (
                                        <li>
                                          <Tag
                                            level={index() === 0 ? "warning" : "success"}
                                            title={index() === 0 ? t("magic.staff.groupLeader") : undefined}
                                          >
                                            <Show when={staffLink(member.url)} fallback={member.name}>
                                              {(url) => (
                                                <a href={url()} target="_blank" rel="noreferrer">
                                                  {member.name}
                                                </a>
                                              )}
                                            </Show>
                                          </Tag>
                                        </li>
                                      )}
                                    </For>
                                  </ul>
                                </div>
                              </section>
                            )}
                          </For>
                        </div>
                      </section>
                    )}
                  </For>
                </div>
              </main>
            </OverlayScrollbarsComponent>
          </section>
        </div>
      </div>
    </>
  );
}

import { usePlatformInfo } from "@api/platform";
import { staffLink, staffLogo } from "@lib/utils/staff";
