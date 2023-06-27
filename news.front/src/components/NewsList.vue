<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useNewsStore } from '@/stores/news'
import { useRouter } from 'vue-router'

const store = useNewsStore()
const newsList = computed(() => store.newsListOrdered)
const router = useRouter()

onMounted(async () => {
  if (!store.country) {
    return
  }
  await store.fetchNews()
})

const detailViewIndex = (indexNews: number) => {
  store.setDetailViewIndex(indexNews)
  router.push({ name: 'news', params: { index: indexNews.toString() } })
}
</script>
<template>
  <section v-if="newsList.length">
    <ul>
      <li v-for="(news, index) in newsList" v-bind:key="index">
        <img
          :src="news.urlToImage"
          alt="Imagem da notícia"
          v-if="news.urlToImage"
          @click="detailViewIndex(index)"
        />
        <span class="title" v-on:click="detailViewIndex(index)">{{ news.title }}</span>
        <div class="info">
          <span class="author">{{ news.author ?? 'Autor desconhecido' }}</span>
          <a class="externalLink" :href="news.url" target="_blank">Link externo</a>
        </div>
      </li>
    </ul>
  </section>
  <section v-else>
    <p>Carregando...</p>
  </section>
</template>
<style scoped>
img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
}
img:hover {
  opacity: 0.8;
  transform: scale(0.99);
}
section {
  overflow: auto;
  max-height: 96vh;
  padding-right: 1rem;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  border-bottom: 1px solid var(--color-border);
  border-radius: 10px;
}
li + li {
  padding-top: 2rem;
}
li span.title {
  cursor: pointer;
}
.author {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}
.title {
  font-size: 1.2rem;
  font-weight: 500;
  display: block;
}
.info {
  display: flex;
  justify-content: space-between;
}
</style>
