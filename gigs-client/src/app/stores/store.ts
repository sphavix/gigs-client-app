import { createContext, useContext } from "react";
import GigStore from "./gigStore";

interface Store {
    gigStore: GigStore
}

export const store: Store = {
    gigStore: new GigStore()
}

export const StoreContext = createContext(store);


// Create a hook to use store inside components
export function useStore() {
    return useContext(StoreContext);
}