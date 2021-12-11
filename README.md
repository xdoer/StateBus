# StateBus

A simple state share tool for React App.

## Install

```bash
$ npm install state-bus
```

## Example

```tsx
import StateBus from 'state-bus';

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
