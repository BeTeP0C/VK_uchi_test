import React, { useContext, useEffect } from "react";
import styles from "./styles.module.scss"
import { observer } from "mobx-react-lite";
import { Header } from "../Header";
import { Cats } from "../Cats";
import { GlobalStoreContext } from "../../pages/_app";
import { GlobalStore } from "../../common/stores/globalStore";

export const LikesPage = observer(() => {
  const globalStore: GlobalStore = useContext(GlobalStoreContext)

  useEffect(() => {
    globalStore.getLikeCats()
  }, [])

  return (
    <div>
      <Header />
      <Cats />
    </div>
  )
})
