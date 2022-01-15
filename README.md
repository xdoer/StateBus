# StateBus

A simple state share tool for React App.

## Install

```bash
$ npm install @xdoer/state-bus --save
```

## Example

### Base Usage

```tsx
import StateBus from '@xdoer/state-bus';

const store = new StateBus(0);

const Home = () => {
  return (
    <div>
      <Profile1 />
      <Profile2 />
    </div>
  );
};

const Profile1 = () => {
  const [count, setCount] = store.useState();

  return (
    <div>
      <div>count: {count}</div>
      <div onClick={() => setCount(i => i + 1)}>setCount</div>
    </div>
  );
};

const Profile2 = () => {
  const [count, setCount] = store.useState();

  return (
    <div>
      <div>count: {count}</div>
      <div onClick={() => setCount(i => i + 1)}>setCount</div>
    </div>
  );
};
```

### createShareHook

```tsx
import { createShareHook } from '@xdoer/state-bus';

const useCount = createShareHook((state, ...rest: number[]) => {
  const [count, setCount] = state.useState();

  useEffect(() => {
    setCunt(count => rest.reduce((t, c) => t + c, count));
  }, []);

  return { count, setCount };
}, 0);

const Home = () => {
  return (
    <div>
      <Profile1 />
      <Profile2 />
    </div>
  );
};

const Profile1 = () => {
  const { count, setCount } = useCount(1, 2, 3);

  return (
    <div>
      <div>count: {count}</div>
      <div onClick={() => setCount(i => i + 1)}>setCount</div>
    </div>
  );
};

const Profile2 = () => {
  const { count, setCount } = useCount(2, 3, 4);

  return (
    <div>
      <div>count: {count}</div>
      <div onClick={() => setCount(i => i + 1)}>setCount</div>
    </div>
  );
};
```

### useStore

```tsx
import { useStore } from '@xdoer/state-bus';

const Home = () => {
  return (
    <div>
      <Profile1 />
      <Profile2 />
    </div>
  );
};

const Profile1 = () => {
  const { count, setCount } = useStore('count', 1);

  return (
    <div>
      <div>count: {count}</div>
      <div onClick={() => setCount(i => i + 1)}>setCount</div>
    </div>
  );
};

const Profile2 = () => {
  const { count, setCount } = useStore('count');

  return (
    <div>
      <div>count: {count}</div>
      <div onClick={() => setCount(i => i + 1)}>setCount</div>
    </div>
  );
};
```
