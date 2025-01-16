import { action, makeAutoObservable, observable, runInAction, toJS } from "mobx";
import { TPage } from "../../types/pages";
import { TCat, TLoading } from "../../types/TGlobal";

export class GlobalStore {
  pages: TPage[] = [
    {
      href: "/",
      text: "Все котики",
      id: 1,
      active: true
    },
    {
      href: "/likes",
      text: "Любимые котики",
      id: 2,
      active: false
    }
  ]

  cats: TCat[] = []
  likeCats: TCat[] = []
  token: string = "live_362sRZeTblec00llVwBmI8U6gVADGkVTmky6BDYgyuHpruw2WUsdI8DlmX7Lr6EL"
  isLoading: TLoading = "alive"
  amountCats: number = 0

  constructor () {
    makeAutoObservable(this)
  }

  handleChangePage = (id: number) => {
    this.pages.forEach(page => {
      page.active = page.id === id;
    });
  }

  async getCats () {
    this.isLoading = "loading"
    try {
      const resp = await fetch(`https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${this.amountCats+15}&limit=15`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.token
        },
        redirect: 'follow'
      })
      .then(response => response.json())
      .then(result => {
        return result
      })

      runInAction(() => {
        resp.map(cat => {
          this.cats.push(
            {
              url: cat.url,
              id: cat.id,
              like: false
            }
          )
        })

        this.amountCats+=15
        this.isLoading = "alive"
      })
    } catch (error) {
      console.log(error)
      this.isLoading = "dead"
    }
  }

  handleLikeCat = (id: string) => {
    const catInCats = this.cats.find(cat => cat.id === id)
    const catInLikeCats = this.likeCats.find(cat => cat.id === id)

    if (catInCats) {
      if (catInCats.like) {
        this.cats = this.cats.map(cat => {
          if (cat.id === id) {
            return {
              ...cat,
              like: false
            }
          }

          return cat
        })

        this.likeCats = this.likeCats.filter(cat => cat.id !== id)
        localStorage.setItem("likeCats", JSON.stringify(this.likeCats))
      } else {
        this.cats = this.cats.map(cat => {
          if (cat.id === id) {
            return {
              ...cat,
              like: true
            }
          }

          return cat
        })

        this.likeCats.push({
          ...catInCats,
          like: true
        })

        localStorage.setItem("likeCats", JSON.stringify(this.likeCats))
      }
    } else {
      if (catInLikeCats) {
        this.likeCats = this.likeCats.filter(cat => cat.id !== id)
        localStorage.setItem("likeCats", JSON.stringify(this.likeCats))
      }
    }
  }

  getLikeCats () {
    const likeCats = localStorage.getItem("likeCats")

    if (likeCats) {
      this.likeCats = JSON.parse(likeCats)
    }
  }
}
