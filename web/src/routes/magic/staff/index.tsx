import botLogo from "@assets/staff/bot.svg";
import challengeLogo from "@assets/staff/challenge.svg";
import managementLogo from "@assets/staff/management.svg";
import operationsLogo from "@assets/staff/operations.svg";
import publicityLogo from "@assets/staff/publicity.svg";
import supportLogo from "@assets/staff/support.svg";
import techLogo from "@assets/staff/tech.svg";
import { Title } from "@storage/header";
import { fullTheme, t } from "@storage/theme";
import Divider from "@widgets/divider";
import Tag from "@widgets/tag";
import { OverlayScrollbarsComponent } from "overlayscrollbars-solid";
import { For } from "solid-js";

const florance = { name: "Florance", url: "https://florance.top" };
const gong_yie = { name: "工一阵", url: "https://qm.qq.com/q/C9AjFHeYnu" };
const boxing = { name: "Boxing", url: "https://github.com/0xboxing" };
const KaedeH0 = { name: "KaedeH0", url: "https://www.kaedeH0.top" };
const web_xxs = { name: "web小手子", url: "https://qm.qq.com/q/b8vaMODqSW" };
const pwn_xxs = { name: "pwn小手子", url: "https://qm.qq.com/q/KNW6mcC88A" };

const bot = { name: "AHNU:CSC.Bot.CAC", url: "https://github.com/FloranceYeh/astrbot_plugin_AHNU_CSC_Bot" };

const subgroups = [
  { label: "magic.staff.coordination", logo: managementLogo, members: [pwn_xxs, boxing] },
  { label: "magic.staff.tech", logo: techLogo, members: [gong_yie, florance] },
  { label: "magic.staff.challenge", logo: challengeLogo, members: [KaedeH0, pwn_xxs, web_xxs] },
  { label: "magic.staff.operations", logo: operationsLogo, members: [boxing, gong_yie, web_xxs, pwn_xxs, florance] },
  { label: "magic.staff.publicity", logo: publicityLogo, members: [florance, gong_yie] },
  { label: "magic.staff.support", logo: supportLogo, members: [florance, KaedeH0] },
  { label: "magic.staff.bot", logo: botLogo, members: [bot] },
];

export default function StaffPage() {
  return (
    <>
      <Title page={t("magic.staff.managementTeam")} route="/magic/staff" />
      <div class="relative flex-1">
        <div class="absolute h-full w-full overflow-scroll snap-mandatory snap-y">
          <section class="h-full min-h-full snap-center flex flex-col items-center justify-center relative p-3">
            <OverlayScrollbarsComponent
              options={{ scrollbars: { theme: `os-theme-${fullTheme()}`, autoHide: "scroll" } }}
              class="absolute inset-0 print:static"
              defer
            >
              <main class="flex min-h-full justify-center px-3 py-9">
                <div class="my-auto flex w-full max-w-3xl flex-col items-center gap-6">
                  <header class="flex w-full items-center gap-6">
                    <img class="size-20 shrink-0 object-contain" src={managementLogo} alt="" width={80} height={80} />
                    <h1 class="min-w-0 wrap-anywhere text-3xl font-bold">{t("magic.staff.managementTeam")}</h1>
                  </header>
                  <Divider class="w-full" />
                  <div class="grid w-full gap-x-8 gap-y-8 sm:grid-cols-2">
                    <For each={subgroups}>
                      {(group) => (
                        <section class="flex min-w-0 items-start gap-4 first:col-span-full">
                          <img class="size-20 shrink-0 object-contain" src={group.logo} alt="" width={80} height={80} />
                          <div class="min-w-0 space-y-2">
                            <h2 class="wrap-anywhere text-xl font-bold">{t(group.label)}</h2>
                            <ul class="flex flex-wrap gap-2">
                              <For each={group.members}>
                                {(member, index) => (
                                  <li>
                                    <Tag
                                      level="success"
                                      class={index() === 0 ? "[&_.tag-dot]:bg-warning" : undefined}
                                      title={index() === 0 ? t("magic.staff.groupLeader") : undefined}
                                    >
                                      <a href={member.url} target="_blank" rel="noreferrer">
                                        {member.name}
                                      </a>
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
                </div>
              </main>
            </OverlayScrollbarsComponent>
          </section>
        </div>
      </div>
    </>
  );
}
