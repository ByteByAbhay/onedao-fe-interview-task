"use client";

import { useEffect, type ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { hydrate } from "@/store/authSlice";

function HydrateAuth() {
  useEffect(() => {
    store.dispatch(hydrate());
  }, []);
  return null;
}

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <HydrateAuth />
      {children}
    </Provider>
  );
}
