import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss"
import { TCat } from "../../../types/TGlobal";
import { Heart } from "../../Icons/HeartLike";
import { HeartLike } from "../../Icons/Heart";

type TCatsItem = {
  cat: TCat,
  handleLikeCat(id: string): void
}

export const CatsItem = observer(({cat, handleLikeCat}: TCatsItem) => {
  return (
    <li className={styles.item}>
      <img className={styles.img} src={cat.url} alt={cat.id} />
      <button
        className={styles.button}
        type="button"
        onClick={() => handleLikeCat(cat.id)}
      >
        <span className={`${styles.icon} ${cat.like ? "" : styles.icon_visible}`}>
          <Heart />
        </span>

        <span className={`${styles.icon} ${styles.like} ${cat.like ? styles.icon_visible : ""}`}>
          <HeartLike />
        </span>
      </button>
    </li>
  )
})
