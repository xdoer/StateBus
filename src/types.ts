export type SetStateAction<S> = S | ((prevState: S) => S);
export type Dispatch<A> = (value: A) => void;
export type RDispatch<T> = Dispatch<SetStateAction<T>>

export interface Hooks {
  onMount?(): void
  onUnMount?(): void
}
