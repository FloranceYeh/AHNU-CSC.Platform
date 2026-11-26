import { staffLogoNames } from "@lib/utils/staff";
import type { StaffEdition } from "@models/config";
import { t } from "@storage/theme";
import Button from "@widgets/button";
import Checkbox from "@widgets/checkbox";
import Input from "@widgets/input";
import Select from "@widgets/select";
import { Index, type JSX, Show } from "solid-js";

function replace<T>(items: T[], index: number, value: T) {
  const result = items.slice();
  result.splice(index, 1, value);
  return result;
}

function removeAt<T>(items: T[], index: number) {
  return items.filter((_, itemIndex) => itemIndex !== index);
}

const customLogo = "__custom__";

function EditorSection(props: { title: string; class: string; children: JSX.Element }) {
  return (
    <details open class={props.class}>
      <summary class="cursor-pointer rounded-md px-2 py-1 font-bold wrap-anywhere hover:bg-layer-content/10 focus-visible:outline-2 focus-visible:outline-primary">
        {props.title}
      </summary>
      <div class="mt-3 grid min-w-0 gap-3">{props.children}</div>
    </details>
  );
}

function LogoField(props: {
  name: string;
  value?: string | null;
  disabled: boolean;
  onChange: (value: string | null) => void;
}) {
  const selected = () => {
    if (props.value == null) return [];
    return [staffLogoNames.includes(props.value) ? props.value : customLogo];
  };

  return (
    <div class="grid min-w-0 gap-2">
      <Select
        name={props.name}
        label={t("magic.staff.editor.logoSelect")}
        placeholder={t("general.actions.select.title")}
        disabled={props.disabled}
        items={[
          ...staffLogoNames.map((value) => ({
            value,
            label: t(`magic.staff.${value === "management" ? "managementTeam" : value}`) || value,
          })),
          { value: customLogo, label: t("magic.staff.editor.customLogo") },
        ]}
        value={selected()}
        onValueChange={({ value }) => props.onChange(value[0] === customLogo ? "" : (value[0] ?? null))}
      />
      <Show when={selected()[0] === customLogo}>
        <Input
          name={`${props.name}-custom`}
          title={t("magic.staff.editor.logo")}
          value={props.value ?? ""}
          onInput={(event) => props.onChange(event.currentTarget.value)}
        />
      </Show>
    </div>
  );
}

export default function StaffEditor(props: {
  editions: StaffEdition[];
  disabled: boolean;
  onChange: (editions: StaffEdition[]) => void;
}) {
  const removeLabel = () => t("general.actions.delete.title");
  return (
    <fieldset class="grid min-w-0 gap-4 rounded-xl border border-layer-content/15 p-4" disabled={props.disabled}>
      <legend class="px-2 font-bold">{t("magic.staff.title")}</legend>
      <Index each={props.editions}>
        {(edition, editionIndex) => {
          const updateEdition = (patch: Partial<StaffEdition>) => {
            props.onChange(replace(props.editions, editionIndex, { ...edition(), ...patch }));
          };
          return (
            <EditorSection
              class="min-w-0 rounded-xl border border-layer-content/15 p-3"
              title={edition().title.trim() || t("magic.staff.editor.editionTitle")}
            >
              <div class="grid gap-2 sm:grid-cols-2">
                <Input
                  name={`staff-edition-${editionIndex}-title`}
                  title={t("magic.staff.editor.editionTitle")}
                  value={edition().title}
                  onInput={(event) => updateEdition({ title: event.currentTarget.value })}
                />
                <LogoField
                  name={`staff-edition-${editionIndex}-logo`}
                  value={edition().logo}
                  disabled={props.disabled}
                  onChange={(logo) => updateEdition({ logo })}
                />
              </div>
              <Index each={edition().groups}>
                {(group, groupIndex) => {
                  const field = `staff-edition-${editionIndex}-group-${groupIndex}`;
                  const updateGroup = (patch: Partial<StaffEdition["groups"][number]>) => {
                    updateEdition({ groups: replace(edition().groups, groupIndex, { ...group(), ...patch }) });
                  };
                  return (
                    <EditorSection
                      class="min-w-0 rounded-lg bg-layer-content/5 p-3"
                      title={group().name.trim() || t("magic.staff.editor.groupName")}
                    >
                      <div class="grid items-start gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                        <Input
                          name={`${field}-name`}
                          title={t("magic.staff.editor.groupName")}
                          value={group().name}
                          onInput={(event) => updateGroup({ name: event.currentTarget.value })}
                        />
                        <LogoField
                          name={`${field}-logo`}
                          value={group().logo}
                          disabled={props.disabled}
                          onChange={(logo) => updateGroup({ logo })}
                        />
                        <div class="justify-self-start whitespace-nowrap sm:mt-6">
                          <Checkbox
                            disabled={props.disabled}
                            checked={group().full_width}
                            onCheckedChange={({ checked }) => updateGroup({ full_width: checked === true })}
                          >
                            <span>{t("magic.staff.editor.fullWidth")}</span>
                          </Checkbox>
                        </div>
                      </div>
                      <Index each={group().members}>
                        {(member, memberIndex) => (
                          <div class="flex flex-wrap items-end gap-2">
                            <Input
                              class="min-w-32 flex-1"
                              name={`${field}-member-${memberIndex}-name`}
                              title={t(memberIndex === 0 ? "magic.staff.groupLeader" : "magic.staff.editor.memberName")}
                              value={member().name}
                              onInput={(event) =>
                                updateGroup({
                                  members: replace(group().members, memberIndex, {
                                    ...member(),
                                    name: event.currentTarget.value,
                                  }),
                                })
                              }
                            />
                            <Input
                              class="min-w-36 flex-1"
                              name={`${field}-member-${memberIndex}-url`}
                              title={t("magic.staff.editor.memberLink")}
                              value={member().url ?? ""}
                              onInput={(event) =>
                                updateGroup({
                                  members: replace(group().members, memberIndex, {
                                    ...member(),
                                    url: event.currentTarget.value,
                                  }),
                                })
                              }
                            />
                            <Show when={memberIndex > 0}>
                              <Button
                                type="button"
                                ghost
                                onClick={() =>
                                  updateGroup({ members: [member(), ...removeAt(group().members, memberIndex)] })
                                }
                              >
                                {t("magic.staff.editor.makeLeader")}
                              </Button>
                            </Show>
                            <Button
                              type="button"
                              ghost
                              level="error"
                              onClick={() => updateGroup({ members: removeAt(group().members, memberIndex) })}
                            >
                              {removeLabel()}
                            </Button>
                          </div>
                        )}
                      </Index>
                      <div class="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => updateGroup({ members: [...group().members, { name: "" }] })}
                        >
                          {t("magic.staff.editor.addMember")}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          ghost
                          level="error"
                          onClick={() => updateEdition({ groups: removeAt(edition().groups, groupIndex) })}
                        >
                          {t("magic.staff.editor.removeGroup")}
                        </Button>
                      </div>
                    </EditorSection>
                  );
                }}
              </Index>
              <div class="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={() =>
                    updateEdition({ groups: [...edition().groups, { name: "", members: [], full_width: false }] })
                  }
                >
                  {t("magic.staff.editor.addGroup")}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  ghost
                  level="error"
                  onClick={() => props.onChange(removeAt(props.editions, editionIndex))}
                >
                  {t("magic.staff.editor.removeEdition")}
                </Button>
              </div>
            </EditorSection>
          );
        }}
      </Index>
      <Button
        type="button"
        class="justify-self-start"
        onClick={() => props.onChange([...props.editions, { title: "", groups: [] }])}
      >
        {t("magic.staff.editor.addEdition")}
      </Button>
    </fieldset>
  );
}
