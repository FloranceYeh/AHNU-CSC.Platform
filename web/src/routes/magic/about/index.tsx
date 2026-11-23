import LogoAnimate from "@assets/animates/logo-animate";
import ret2shellLogo from "@assets/ret2shell-logo.svg";
import { Title } from "@storage/header";
import { platformStore } from "@storage/platform";
import { fullTheme, t } from "@storage/theme";
import Divider from "@widgets/divider";
import Link from "@widgets/link";
import Tag from "@widgets/tag";
import { OverlayScrollbarsComponent } from "overlayscrollbars-solid";

export default function () {
  const version = () => platformStore.version || "UNKNOWN";
  const isDevelopment = () => version().includes("*");

  return (
    <>
      <Title page={t("magic.about.title")} route="/magic/about" />
      <div class="flex-1 relative">
        <div class="absolute h-full w-full overflow-scroll snap-mandatory snap-y">
          <section class="h-full min-h-full snap-center flex flex-col items-center justify-center relative p-3">
            <OverlayScrollbarsComponent
              options={{
                scrollbars: {
                  theme: `os-theme-${fullTheme()}`,
                  autoHide: "scroll",
                },
              }}
              class="relative w-full h-full print:h-auto print:overflow-auto"
              defer
            >
              <div class="w-full flex flex-col items-center justify-center min-h-full py-6">
                <div class="max-w-3xl w-full flex flex-col items-center justify-center space-y-6">
                  <div class="flex min-h-20 w-full max-w-xl items-center gap-6">
                    <LogoAnimate class="shrink-0" width={80} height={80} aria-hidden="true" />
                    <div class="min-w-0 space-y-1 wrap-anywhere">
                      <h1 class="text-3xl font-bold">
                        <a
                          class="inline-flex max-w-full items-center gap-2 hover:underline"
                          href="https://github.com/FloranceYeh/AHNU-CSC.Platform"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span class="min-w-0">AHNU:CSC.Platform</span>
                          <span class="shrink-0 icon-[fluent--open-20-regular] w-4 h-4" aria-hidden="true" />
                        </a>
                      </h1>
                      <p class="text-sm opacity-80">{t("magic.about.projectDescription")}</p>
                    </div>
                  </div>
                  <section class="w-full flex flex-col items-center space-y-3">
                    <h2 class="text-xl font-bold">{t("magic.about.projectContributors")}</h2>
                    <div class="flex flex-wrap justify-center">
                      <Tag level="success" class="m-1">
                        <a href="https://github.com/FloranceYeh" target="_blank" rel="noreferrer">
                          Florance
                        </a>
                      </Tag>
                      <Tag level="success" class="m-1">
                        <a href="https://github.com/Gong-Yie" target="_blank" rel="noreferrer">
                          工一阵
                        </a>
                      </Tag>
                    </div>
                  </section>
                  <Divider class="w-full" />
                  <section class="w-full flex flex-col items-center space-y-3">
                    <h2 class="text-xl font-bold">{t("magic.about.acknowledgments.title")}</h2>
                    <div class="flex min-h-20 w-full max-w-xl items-center gap-6">
                      <img class="shrink-0" src={ret2shellLogo} alt="" width={80} height={80} />
                      <div class="min-w-0 space-y-1 wrap-anywhere">
                        <h3 class="text-3xl font-bold">
                          <a
                            class="inline-flex items-center gap-2 hover:underline"
                            href="https://github.com/ret2shell/ret2shell"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Ret2Shell
                            <span class="shrink-0 icon-[fluent--open-20-regular] w-4 h-4" aria-hidden="true" />
                          </a>
                        </h3>
                        <p class="text-sm opacity-80">{t("magic.about.acknowledgments.description")}</p>
                        <div class="flex flex-wrap gap-x-2 text-base font-bold opacity-60">
                          <span class={isDevelopment() ? "text-warning" : "text-primary"}>
                            {isDevelopment() ? "DEV" : "REL"}
                          </span>
                          <span>{version().replace("*", "")}</span>
                        </div>
                      </div>
                    </div>
                  </section>
                  <div class="w-full flex flex-col items-center space-y-3">
                    <h3 class="font-bold">{t("license.title")}</h3>
                    <p class="max-w-2xl text-center text-sm opacity-60">{t("magic.about.license.description")}</p>
                    <div class="flex flex-row flex-wrap justify-center">
                      <Tag level="info" class="m-1">
                        <span>{t("magic.about.license.gplBase")}</span>
                      </Tag>
                      <Tag level="success" class="m-1">
                        <span>{t("magic.about.license.copyleft")}</span>
                      </Tag>
                      <Tag level="warning" class="m-1">
                        <span>{t("magic.about.license.commercial")}</span>
                      </Tag>
                      <Tag level="error" class="m-1">
                        <span>{t("magic.about.license.noUserFees")}</span>
                      </Tag>
                    </div>
                    <Link href="https://ret.sh.cn/license" ghost size="sm" class="space-x-2">
                      <span class="shrink-0 icon-[fluent--open-20-regular] w-4 h-4" />
                      <span>{t("magic.about.license.view")}</span>
                    </Link>
                  </div>
                  <h3 class="font-bold">{t("magic.about.acknowledgments.developers")}</h3>
                  <div class="flex flex-row flex-wrap justify-center">
                    <Tag level="success" class="m-1">
                      <a href="https://github.com/Reverier-Xu" target="_blank" rel="noreferrer">
                        Reverier-Xu
                      </a>
                    </Tag>
                  </div>
                  <h3 class="font-bold">{t("magic.about.acknowledgments.contributors")}</h3>
                  <div class="flex flex-row flex-wrap justify-center">
                    <Tag level="info" class="m-1">
                      <a href="https://github.com/cdcq" target="_blank" rel="noreferrer">
                        cdcq
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://github.com/orangecheers-x" target="_blank" rel="noreferrer">
                        Orange Cheers
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://github.com/frankli0324" target="_blank" rel="noreferrer">
                        frankli0324
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://github.com/DX39061" target="_blank" rel="noreferrer">
                        DX3906
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://github.com/GZTimeWalker" target="_blank" rel="noreferrer">
                        GZTime
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://github.com/Cnily03" target="_blank" rel="noreferrer">
                        Cnily03
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://github.com/ElaBosak233" target="_blank" rel="noreferrer">
                        ElaBosak233
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://github.com/CSharperMantle" target="_blank" rel="noreferrer">
                        csmantle
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://github.com/h4kuy4" target="_blank" rel="noreferrer">
                        h4kuy4
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://github.com/mnixry" target="_blank" rel="noreferrer">
                        mnixry
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://github.com/ZacharyZcR" target="_blank" rel="noreferrer">
                        ZacharyZcR
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://github.com/seclabx-org" target="_blank" rel="noreferrer">
                        seclabx-org
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://github.com/huangzheng2016" target="_blank" rel="noreferrer">
                        HydrogenE7
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://github.com/chunzhennn" target="_blank" rel="noreferrer">
                        chunzhennn
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://github.com/avasummer" target="_blank" rel="noreferrer">
                        avasummer
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://github.com/starnotes-xj" target="_blank" rel="noreferrer">
                        starnotes-xj
                      </a>
                    </Tag>
                  </div>
                  <h3 class="font-bold">{t("magic.about.acknowledgments.dependencies")}</h3>
                  <div class="flex flex-row flex-wrap justify-center">
                    <Tag level="warning" class="m-1">
                      <a href="https://github.com/rust-lang/rust" target="_blank" rel="noreferrer">
                        Rust
                      </a>
                    </Tag>
                    <Tag level="warning" class="m-1">
                      <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
                        Typescript
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://tokio.rs/" target="_blank" rel="noreferrer">
                        Tokio
                      </a>
                    </Tag>
                    <Tag level="info" class="m-1">
                      <a href="https://solidjs.com/" target="_blank" rel="noreferrer">
                        Solid JS
                      </a>
                    </Tag>
                    <Tag level="success" class="m-1">
                      <a href="https://k3s.io/" target="_blank" rel="noreferrer">
                        K3S
                      </a>
                    </Tag>
                    <Tag level="success" class="m-1">
                      <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">
                        PostgreSQL
                      </a>
                    </Tag>
                    <Tag level="success" class="m-1">
                      <a href="https://valkey.io/" target="_blank" rel="noreferrer">
                        Valkey
                      </a>
                    </Tag>
                    <Tag level="success" class="m-1">
                      <a href="https://git-scm.com/" target="_blank" rel="noreferrer">
                        Git
                      </a>
                    </Tag>
                    <Tag level="success" class="m-1">
                      <a href="https://rune-rs.github.io/" target="_blank" rel="noreferrer">
                        Rune
                      </a>
                    </Tag>
                  </div>
                </div>
              </div>
            </OverlayScrollbarsComponent>
          </section>
        </div>
      </div>
    </>
  );
}
