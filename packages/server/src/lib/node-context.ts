import { Maybe, uuid } from "@banjoanton/utils";
import { AsyncLocalStorage } from "node:async_hooks";

type StoreContext = {
    requestId: Maybe<string>;
    userId: Maybe<number>;
};
const store: StoreContext = {
    requestId: undefined,
    userId: undefined,
};

const context = new AsyncLocalStorage<StoreContext>();

const setStoreValue = <K extends keyof StoreContext>(key: K, value: StoreContext[K]): void => {
    const store = context.getStore();
    if (!store) return;
    store[key] = value;
};

const getRequestId = () => context.getStore()?.requestId;
const setRequestId = (requestId: string) => setStoreValue("requestId", requestId);

const getUserId = (): Maybe<number> => context.getStore()?.userId;
const setUserId = (userId: number) => setStoreValue("userId", userId);

// @ts-ignore
const setupExpressContext = (req, res, next) => {
    context.run(store, () => {
        const requestId = uuid();
        setRequestId(requestId);
        next();
    });
};

const exists = () => context.getStore() !== undefined;

export const NodeContext = {
    setupExpressContext,
    getRequestId,
    getUserId,
    setUserId,
    setRequestId,
    context,
    store,
    exists,
};
