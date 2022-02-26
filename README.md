# StateBus

React 下一个简单的状态共享工具

## 安装

```bash
npm install @xdoer/state-bus --save
```

## 使用

1. 组件外部初始化一个 `StatusBus` 对象。
2. 组件内部使用 `StatusBus` 对象上的 `useState` 方法。

```tsx
import StateBus from '@xdoer/state-bus';

const store = StateBus.create<number>(0);

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

## 装载与卸载

`StateBus` 对象暴露了一个 `hooks` 对象，对象上有 `onMount` 和 `onUnMount` 事件。

```tsx
const store = StateBus.create<number>(0);

store.hooks.onMount = () => {
  // 第一个组件加载时执行
}

store.hooks.onUnMount = () => {
  // 最后一个组件卸载时执行
}

const Profile1 = () => {
  const [count, setCount] = store.useState();
  return <div>{count}</div>;
};

const Profile2 = () => {
  const [count, setCount] = store.useState();
  return <div>{count}</div>
};
```

## createShareHook

`createShareHook` 是一件简单的闭包函数，允许你创建高阶 Hook。

```tsx
import { createShareHook } from '@xdoer/state-bus';

const useCount = createShareHook(
  store => {
    const [count, setCount] = store.useState();

    store.hooks.onMount = () => {
      request('/count').then(res => setCount(res));
    }

    return { count, setCount };
  },
  0
);
```

## useStore

`useStore` 不再需要在组件外部初始化 `StateBus`。与 `useState` 不同的是，需要你指定一个 `key`

```tsx
import { useStore } from '@xdoer/state-bus';

function useCount() {
  const [count, setCount] = useStore('count', '1')
  return { count, setCount }
}

const Profile1 = ({ id }) => {
  const { count, setCount } = useCount()

  return (
    <div>
      <div>count: {count}</div>
      <div onClick={() => setCount(i => i + 1)}>setCount</div>
    </div>
  );
};

const Profile2 = () => {
  const { count, setCount } = useCount()

  return (
    <div>
      <div>count: {count}</div>
      <div onClick={() => setCount(i => i + 1)}>setCount</div>
    </div>
  );
};
```

## getStore

`getStore` 允许你在任意地方，获得 `useStore` 状态数据

```tsx
const Button = () => {
  const [count, setCount] = useState()

  function onClick() {
    // 根据 key 得到状态
    const storeCount = getStore('count')

    setCount(storeCount)
  }

  return (
    <div onClick={onClick}>
      storeCount: {count}
    </div>
  );
};
```

## setCount

`setStore` 允许你在任意地方，更新 `useStore` 状态数据

```tsx
const Button = () => {

  function onClick() {
    setStore('count', 1)

    setStore('count', prev => prev + 1)
  }

  return (
    <div onClick={onClick}>
      click
    </div>
  );
};
```

## 扩展

持久化状态到异步 storage

```ts
class StorageState<T = any> extends StateBus<T> {
  constructor(private key: string, init?: T | (() => T)) {
    super(init);
  }

  async getState(): Promise<T> {
    const state = super.getState();
    const storage: any = await getStorage(this.key);

    if (!isUndefined(storage)) {
      if (state !== storage) {
        super.setState(storage as any);
      }
      return storage;
    }

    if (!isUndefined(state)) {
      await setStorage({ key: this.key, data: state });
    }

    return state;
  }

  async setState(state: any) {
    super.setState(state);
    await setStorage({ key: this.key, data: state });
  }
}
```
