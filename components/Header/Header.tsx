import React, { useContext } from "react";
import styles from "./styles.module.scss"
import { HeaderLinks } from "./HeaderLinks";
import { observer } from "mobx-react-lite";

export const Header = observer(() => {
  return (
    <header className={styles.container}>
      <HeaderLinks />
    </header>
  )
})
