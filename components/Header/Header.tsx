import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss"
import { HeaderLinks } from "./HeaderLinks";

export const Header = observer(() => {
  return (
    <header className={styles.container}>
      <HeaderLinks />
    </header>
  )
})
