import { handleHttpError } from "@api";
import { getVersion, usePlatformInfo } from "@api/platform";
import Background from "@blocks/background";
import { Permission } from "@models/user";
import { useLocation, useNavigate, useSearchParams } from "@solidjs/router";
import { accountStore } from "@storage/account";
import { Title } from "@storage/header";
import { frontendCompatVersion, platformStore, setPlatformStore } from "@storage/platform";
import { t } from "@storage/theme";
import { addToast, removeToast } from "@storage/toast";
import { HTTPError } from "ky";
import { createEffect, createSignal, type JSX, onCleanup, onMount, Show, untrack } from "solid-js";
import { Transition } from "solid-transition-group";
import PlatformTitle from "./_blocks/platform-title";
import TitleBar from "./_blocks/title-bar";
import Toasts from "./_blocks/toasts";

function checkCookiePolicy() {
  if (!platformStore.accept_cookies) {
    const toastId = addToast({
      level: "info",
      description: t("platform.cookiePolicy"),
      accept: () => {
        setPlatformStore({ accept_cookies: true });
        setTimeout(() => {
          removeToast(toastId);
        }, 50);
      },
      acceptLabel: t("general.actions.ok.title"),
      reject: () => {
        setPlatformStore({ accept_cookies: true });
        setTimeout(() => {
          removeToast(toastId);
        }, 50);
      },
      rejectLabel: t("general.actions.yes.title"),
    });
  }
}

export default function (props: { children?: JSX.Element }) {
  const platformInfo = usePlatformInfo();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isHome = () => location.pathname === "/";
  const platformName = () => platformInfo.data?.name || t("platform.name") || "";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const [typedLength, setTypedLength] = createSignal(0);
  const [showIntro, setShowIntro] = createSignal(
    isHome() && searchParams.event === undefined && !reducedMotion.matches
  );
  let introTimer: ReturnType<typeof setTimeout> | undefined;
  let typingTimer: ReturnType<typeof setInterval> | undefined;
  onCleanup(() => {
    clearTimeout(introTimer);
    clearInterval(typingTimer);
  });
  createEffect(() => {
    if (!isHome() || searchParams.event !== undefined || platformInfo.data?.zen_game) {
      setShowIntro(false);
      clearTimeout(introTimer);
      clearInterval(typingTimer);
    }
  });
  const navigate = useNavigate();
  function checkEmailVerification() {
    if (accountStore.token && !accountStore.permissions.includes(Permission.Verified)) {
      addToast({
        level: "warning",
        description: t("account.status.unverified.message"),
        accept: () => {
          navigate("/account/settings");
        },
        acceptLabel: t("general.actions.goto.title"),
      });
    }
  }

  onMount(async () => {
    try {
      await loadVersion();
    } catch (err) {
      // console.log(err);
      if (err instanceof HTTPError && err.response?.status === 503) {
        setPlatformStore({ under_maintenance: true });
      } else if (err instanceof HTTPError && err.response?.status === 502) {
        addToast({
          level: "error",
          description: `${t("platform.errors.offline.title")}: ${t("platform.errors.offline.message")}`,
        });
        navigate(`/sigtrap/${err.response?.status || 502}`);
      } else if (err instanceof HTTPError) {
        addToast({
          level: "error",
          description: `${t("platform.errors.internal.title")}: ${err.response?.statusText || err.message}`,
        });
        navigate(`/sigtrap/${err.response?.status || 500}`);
      } else {
        handleHttpError(err as Error, t("platform.errors.internal.title"));
        navigate("/sigtrap/unknown");
      }
      setPlatformStore({ backend_online: false });
    }
    setTimeout(checkCookiePolicy, 1000);

    if (showIntro()) {
      introTimer = setTimeout(() => {
        typingTimer = setInterval(() => {
          if (typedLength() < [...platformName()].length) {
            setTypedLength((length) => length + 1);
          } else {
            clearInterval(typingTimer);
            introTimer = setTimeout(() => setShowIntro(false), 350);
          }
        }, 65);
      }, 300);
    }
  });

  async function loadVersion() {
    try {
      const version = await getVersion();
      setPlatformStore({
        version,
        under_maintenance: false,
        backend_online: true,
      });
      if (!version.startsWith(frontendCompatVersion)) {
        addToast({
          level: "warning",
          description: `${t("platform.errors.versionMismatch.title")}: ${t("platform.errors.versionMismatch.message", {
            frontend: frontendCompatVersion,
            backend: version,
          })}`,
        });
      }
      console.log(
        `\n%cR%cet %c2 %cS%chell %cv%c${version}\n\n%cCopyright (c) 2022 - ${new Date().getFullYear()} %cRet 2 Shell%c, licensed under the Ret2Shell Public License 2.0, a GPL-3.0-derived copyleft license with limited user-facing monetization restrictions.\n\n%cHaving issue? You can open a ticket on https://github.com/ret2shell, any bug reports or feature requests are welcome.\n\n%cSee /license for details.\n`,
        "color: #0078D6; font-weight: bold; font-size: 1.5rem;",
        "color: currentColor; font-weight: bold; font-size: 1.5rem;",
        "color: #808080; font-weight: bold; font-size: 1.5rem;",
        "color: #f83030; font-weight: bold; font-size: 1.5rem;",
        "color: currentColor; font-weight: bold; font-size: 1.5rem;",
        "color: #0078D6",
        "color: #808080",
        "color: #808080",
        "color: #808080;text-decoration: underline;",
        "color: #808080;",
        "color: #808080;",
        "color: currentColor;"
      );
    } catch (err) {
      setPlatformStore({ version: `${frontendCompatVersion}-UNKNOWN-0.0.0` });
      if (err instanceof HTTPError && err.response?.status === 503) {
        setPlatformStore({ under_maintenance: true, backend_online: false });
        navigate("/");
      }
      throw err;
    }
  }

  createEffect(() => {
    if (accountStore.token) {
      untrack(() => {
        setTimeout(() => {
          checkEmailVerification();
        }, 1000);
      });
    }
  });

  return (
    <>
      <Title domain={platformInfo.data?.name ?? t("platform.name")} route="/" />
      <Background featured={isHome()} />
      <TitleBar />
      {props.children}
      <Toasts />
      <Transition
        onExit={(el, done) => {
          if (reducedMotion.matches || !isHome()) {
            done();
          } else {
            const animation = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300 });
            animation.onfinish = done;
            animation.oncancel = done;
          }
        }}
      >
        <Show when={showIntro()}>
          <div class="fixed inset-0 z-50 bg-layer print:hidden" aria-hidden="true">
            <Background featured />
            <div class="w-full h-full flex flex-col items-center pt-16 pb-24">
              <div class="flex-1" />
              <PlatformTitle name={platformName()} typedName={[...platformName()].slice(0, typedLength()).join("")} />
              <div class="text-xl opacity-0 mt-8">&nbsp;</div>
              <div class="flex-1" />
            </div>
          </div>
        </Show>
      </Transition>
    </>
  );
}
