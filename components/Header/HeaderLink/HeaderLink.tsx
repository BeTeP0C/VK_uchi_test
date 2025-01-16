import React from "react";
import styles from "./styles.module.scss"
import { TPage } from "../../../types/pages";
import { useRouter } from 'next/router';

type THeaderLink = {
  page: TPage
  handleChangePage(id: number): void
}

export function HeaderLink (props: THeaderLink) {
  const {page, handleChangePage} = props
  const router = useRouter()

  return (
    <li className={styles.item}>
      <a
        className={`${styles.link} ${page.active ? styles.link_active : ""}`}
        href={page.href}
        onClick={(e) => {
          e.preventDefault()
          handleChangePage(page.id)
          router.push(page.href)
        }}
      >{page.text}</a>
    </li>
  )
}
