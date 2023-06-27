<script setup lang="ts">
import { useNewsStore } from '@/stores/news'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const store = useNewsStore()
const router = useRouter()
const news = computed(() => store.detailView)

onMounted(async () => {
  if (!store.newsList.length) {
    await store.fetchNews()
  }
  store.setDetailViewIndex(Number(router.currentRoute.value.params.index))
  if (!news.value?.title) {
    router.push({ name: 'home' })
  }
})
const prevNews = () => {
  store.nextNews()
  router.push({ name: 'news', params: { index: store.actualIndex.toString() } })
}
const nextNews = () => {
  store.nextNews()
  router.push({ name: 'news', params: { index: store.actualIndex.toString() } })
}
</script>
<template>
  <div class="news" v-if="news.title">
    <div>
      <img :src="news.urlToImage" alt="Imagem da notícia" v-if="news.urlToImage" />
      <h2 class="green">
        <a :href="news.url" target="_blank">{{ news.title }}</a>
      </h2>
      <span class="author">Fonte: {{ news.author ?? 'Autor desconhecido' }}</span>
      <br />
      <a class="externalLink" :href="news.url" target="_blank">Link externo</a>
      <p>{{ news.content ?? 'Notícia está sem conteúdo' }}</p>
    </div>
    <div class="navigation">
      <button v-on:click="prevNews">Anterior</button>
      <button v-on:click="nextNews">Próxima</button>
    </div>
  </div>
  <div v-else>
    <p>Carregando...</p>
  </div>
</template>
<style scoped>
.info,
.navigation {
  display: flex;
  justify-content: space-between;
}
.navigation {
  margin-top: 2rem;
}
.navigation button {
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  background-color: var(--color-background);
  cursor: pointer;
  color: var(--color-text);
}
img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 0 20px #fdfdfd47;
}
.news {
  overflow: auto;
}
</style>
