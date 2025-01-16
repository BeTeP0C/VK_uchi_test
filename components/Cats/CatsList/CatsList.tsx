import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss"
import { GlobalStore } from "../../../common/stores/globalStore";
import { GlobalStoreContext } from "../../../pages/_app";
import { CatsItem } from "../CatsItem";

type TCatsList = {
  listRef: React.MutableRefObject<HTMLUListElement>
}

export const CatsList = observer(({listRef}: TCatsList) => {
  const globalStore: GlobalStore = useContext(GlobalStoreContext)

  return (
    <ul className={styles.list} ref={listRef}>
      {globalStore.pages[0].active ? (
        globalStore.cats.map(cat => {
          return <CatsItem key={cat.id} cat={cat} handleLikeCat={globalStore.handleLikeCat}/>
        })
      ) : ""}

      {globalStore.pages[1].active ? (
        globalStore.likeCats.map(cat => {
          return <CatsItem key={cat.id} cat={cat} handleLikeCat={globalStore.handleLikeCat}/>
        })
      ) : ""}
    </ul>
  )
})
