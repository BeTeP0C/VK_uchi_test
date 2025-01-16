import type { AppProps } from "next/app";
import "../styles/styles.global.scss";
import React, { createContext } from "react";
import { enableStaticRendering, observer } from "mobx-react-lite";
import { GlobalStore } from "../common/stores/globalStore";

enableStaticRendering(typeof window === "undefined");
export const GlobalStoreContext = createContext<GlobalStore | null>(null)
const globalStore = new GlobalStore()

export default observer (({ Component, pageProps }: AppProps) => (
  <GlobalStoreContext.Provider value={globalStore}>
    <Component {...pageProps}/>
  </GlobalStoreContext.Provider>
))
