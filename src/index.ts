import { Accessor, createSignal } from "solid-js";
import { NotWrappable, DeepReadonly } from "solid-js/store";
import { SignalOptions } from "solid-js/types/reactive/signal";
import { produce, Draft } from "immer";

export type ImmerSetter<T> = <U extends T>(
  value:
    | (U extends Function ? never : U)
    | (U extends NotWrappable ? never : (draft: Draft<U>) => void)
) => U;

export type ImmerSignal<T> = [
  get: Accessor<DeepReadonly<T>>,
  set: ImmerSetter<T>
];

export function createImmerSignal<T>(
  value: T extends NotWrappable ? never : T,
  options?: SignalOptions<T>
): ImmerSignal<T> {
  const signal = createSignal<T>(value, options);

  const getter: any = signal[0];
  const setter: any = signal[1];

  const immerSetter: ImmerSetter<T> = (value: any) => {
    if (typeof value !== "function") {
      return setter(value);
    } else {
      return setter(
        produce((draft: any) => {
          value(draft);
        })
      );
    }
  };

  return [getter, immerSetter];
}
