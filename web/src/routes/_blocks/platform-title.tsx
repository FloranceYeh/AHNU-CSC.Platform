function TitleBracket(props: { closing?: boolean }) {
  return (
    <svg
      class="block h-[0.9em] w-full overflow-visible text-primary"
      classList={{ "rotate-180": props.closing }}
      viewBox="0 0 16 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13 3H10a6 6 0 0 0-6 6v18a6 6 0 0 0 6 6h3"
        stroke="currentColor"
        stroke-width="4.5"
        stroke-linecap="round"
      />
    </svg>
  );
}

export default function PlatformTitle(props: { name: string; typedName?: string }) {
  return (
    <h1 class="grid max-w-[calc(100%-3rem)] grid-cols-[0.4em_minmax(0,auto)_0.4em] items-center gap-[0.45em] text-center text-3xl font-bold">
      <TitleBracket />
      <span class="grid min-w-0 wrap-anywhere">
        <span class="col-start-1 row-start-1" classList={{ invisible: props.typedName !== undefined }}>
          {props.name}
        </span>
        <span class="col-start-1 row-start-1" aria-hidden="true">
          {props.typedName}
        </span>
      </span>
      <span class="relative" aria-hidden="true">
        <TitleBracket closing />
        <span class="absolute bottom-0 left-full ml-[0.4em] h-[0.13em] w-[0.45em] rounded-full bg-primary motion-safe:animate-pulse" />
      </span>
    </h1>
  );
}
