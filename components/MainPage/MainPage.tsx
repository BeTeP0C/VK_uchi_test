import React, { useCallback, useContext, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss"
import { Header } from "../Header";
import { GlobalStore } from "../../common/stores/globalStore";
import { GlobalStoreContext } from "../../pages/_app";
import { Cats } from "../Cats";

export const MainPage = observer(() => {
  const globalStore: GlobalStore = useContext(GlobalStoreContext)

  useEffect(() => {
    if (globalStore.cats.length === 0) {
      globalStore.getCats()
    }
  }, [])

  const scrollListenerRef = useRef<() => void>(null);
  const handleScroll = useCallback(() => {
    if (globalStore.isLoading === "loading") return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;

    if (scrollY + windowHeight >= fullHeight - 200) {
      globalStore.getCats()
    }
  },[globalStore.isLoading, globalStore.amountCats])


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    scrollListenerRef.current = handleScroll;
    return () => {
      window.removeEventListener("scroll", scrollListenerRef.current as () => void);
    };
  }, [handleScroll]);

  return (
    <div>
      <Header />
      <Cats />
      {globalStore.isLoading === "loading" ? (
        <div className={styles.loader}>Загрузка...</div>
      ) :
      globalStore.isLoading === "dead" ? (
        <div className={styles.loader}>Ошибка загрузки</div>
      ) : ""}
    </div>
  )
})
