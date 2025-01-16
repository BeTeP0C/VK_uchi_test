'use client'

import React, { useContext } from "react";
import styles from "./styles.module.scss"
import { HeaderLink } from "../HeaderLink/HeaderLink";
import { GlobalStore } from "../../../common/stores/globalStore";
import { GlobalStoreContext } from "../../../pages/_app";

export function HeaderLinks () {
  const globalStore: GlobalStore = useContext(GlobalStoreContext)

  return (
    <ul className={styles.list}>
      {globalStore.pages.map(link => {
        return (
          <HeaderLink
            key={link.id}
            page={link}
            handleChangePage={globalStore.handleChangePage}
          />
        )
      })}
    </ul>
  )
}
