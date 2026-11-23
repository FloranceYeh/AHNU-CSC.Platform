import logo from "@assets/logo.svg";
import type { ComponentProps } from "solid-js";

export default function (props: ComponentProps<"svg">) {
  return (
    <svg width={256} height={256} {...props} viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <image class="logo-mark" href={logo} width="240" height="240" />
    </svg>
  );
}
