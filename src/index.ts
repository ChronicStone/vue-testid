import { Directive } from "vue";

export type TestIdSelector =
  | string
  | { value: string; selector: string; parentScope?: boolean }
  | {
      multiple: boolean;
      value: (index: number) => string;
      selector: string;
      parentScope?: boolean;
    }
  | Array<
      | { value: string; selector: string; parentScope?: boolean }
      | {
          multiple: boolean;
          value: (index: number) => string;
          selector: string;
          parentScope?: boolean;
        }
      | string
    >;

export const vTestid: Directive<HTMLElement, TestIdSelector> = (
  el,
  binding
) => {
  if (typeof binding.value === "object" && Array.isArray(binding.value)) {
    binding.value.forEach(value => {
      if (typeof value === "object" && "multiple" in value) {
        const elements = (value.parentScope ? document : el).querySelectorAll(
          value.selector
        );
        elements.forEach((element, index) => {
          const testId = value.value(index);
          element.setAttribute("data-testid", testId);
        });
        return;
      }

      const scope =
        typeof value === "string" ? el : value.parentScope ? document : el;
      const selector = typeof value === "string" ? null : value.selector;
      const element = selector ? scope.querySelector(selector) ?? el : el;
      element.setAttribute(
        "data-testid",
        typeof value === "string" ? value : value.value
      );
    });
    return;
  }

  if (
    typeof binding.value === "object" &&
    "multiple" in binding.value &&
    binding.value.multiple === true
  ) {
    const elements = (
      binding.value.parentScope ? document : el
    ).querySelectorAll(binding.value.selector);
    const valueGetter = binding.value.value;
    elements.forEach((element, index) => {
      const testId = valueGetter(index);
      element.setAttribute("data-testid", testId);
    });
    return;
  }

  const selector =
    typeof binding.value === "string" ? null : binding.value.selector;
  const scope =
    typeof binding.value === "string"
      ? el
      : binding.value.parentScope
      ? document
      : el;
  const element = selector ? scope.querySelector(selector) ?? el : el;
  const testId =
    typeof binding.value === "string"
      ? binding.value
      : typeof binding.value.value === "string"
      ? binding.value.value
      : binding.value.value(0);
  element.setAttribute("data-testid", testId);
};
