import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { News } from '@/domain/models/News'
import type { Country } from '@/domain/constants/countries'

export const useNewsStore = defineStore('news', () => {
  const newsList = ref([] as News[])
  const detailView = ref({} as News)
  const actualIndex = ref(0)
  const country = ref({ value: 'br', text: 'Brasil' } as Country)
  const newsListOrdered = computed(() => {
    return newsList.value.sort((a, b) => {
      if (a.urlToImage && !b.urlToImage) return -1
      if (!a.urlToImage && b.urlToImage) return 1
      return 0
    })
  })

  async function fetchNews() {
    const res = await fetch(
      'http://localhost:3001/api/articles_from_country/' + country.value.value
    )
    const data = await res.json()
    newsList.value = data
  }
  function setDetailView(news: News) {
    detailView.value = news
  }
  function setDetailViewIndex(index: number) {
    actualIndex.value = index
    detailView.value = newsList.value[index]
  }

  const nextNews = () => {
    if (actualIndex.value === null) return null
    if (actualIndex.value === newsList.value.length - 1) return null
    setDetailViewIndex(actualIndex.value + 1)
  }
  const prevNews = () => {
    if (actualIndex.value === null) return null
    if (actualIndex.value === 0) return null
    setDetailViewIndex(actualIndex.value - 1)
  }
  function setCountry(countryParam: Country) {
    country.value = countryParam
    newsList.value = []
  }

  return {
    newsList,
    detailView,
    nextNews,
    prevNews,
    fetchNews,
    setDetailView,
    setDetailViewIndex,
    setCountry,
    country,
    newsListOrdered,
    actualIndex
  }
})
