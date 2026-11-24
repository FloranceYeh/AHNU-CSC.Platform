import { Show } from "solid-js";

function CornerPattern(props: { class: string }) {
  return (
    <svg class={props.class} viewBox="0 0 360 240" fill="none">
      <path
        d="M3 26v146a64 64 0 0 0 64 64h272"
        stroke="currentColor"
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
      />
      <g class="site-background-detail">
        <path
          class="site-background-secondary"
          d="M40 64v98a36 36 0 0 0 36 36h240"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
        <rect x="77" y="43" width="66" height="66" rx="19" vector-effect="non-scaling-stroke" />
        <rect class="site-background-accent" x="160" y="43" width="46" height="46" rx="13" />
        <rect class="site-background-tint" x="77" y="126" width="46" height="46" rx="13" />
        <rect x="140" y="106" width="66" height="66" rx="19" vector-effect="non-scaling-stroke" />
        <path
          class="site-background-secondary"
          d="M232 151h61m-61 21h37"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
      </g>
    </svg>
  );
}

export default function Background(props: { featured?: boolean }) {
  return (
    <div class="site-background" classList={{ "site-background-featured": props.featured }} aria-hidden="true">
      <Show when={props.featured}>
        <div class="site-background-rectangle site-background-rectangle-start" />
        <div class="site-background-rectangle site-background-rectangle-end" />
      </Show>
      <CornerPattern class="site-background-pattern site-background-start" />
      <CornerPattern class="site-background-pattern site-background-end" />
    </div>
  );
}
