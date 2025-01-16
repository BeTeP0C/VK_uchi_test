import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss"
import { observer } from "mobx-react-lite";
import { CatsList } from "./CatsList";
import { GlobalStore } from "../../common/stores/globalStore";
import { GlobalStoreContext } from "../../pages/_app";

export const Cats = observer(() => {
  const globalStore: GlobalStore = useContext(GlobalStoreContext)
  const [isShowButton, setIsShowButton] = useState<boolean>(true)
  const listRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    if (listRef.current) {
      if (listRef.current.scrollHeight >= document.documentElement.offsetHeight) {
        setIsShowButton(false)
      }
    }
  }, [0])

  return (
    <div className={styles.container}>
      <CatsList listRef={listRef}/>

      {
        isShowButton &&
        globalStore.isLoading !== "loading" &&
        globalStore.pages[0].active ? (
          <div className={styles.centering}>
          <button className={styles.button} onClick={() => {
            setIsShowButton(false)
            globalStore.getCats()
          }}>
            Загрузить еще
          </button>
        </div>
      ) : ""}
    </div>
  )
})
