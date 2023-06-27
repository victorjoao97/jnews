<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { countries, type Country } from './domain/constants/countries'
import { useNewsStore } from './stores/news'
import { ref, watch } from 'vue'

const store = useNewsStore()
const countrySelected = ref('br')
const router = useRouter()

watch(countrySelected, async (country: string) => {
  router.push({ name: 'home' })
  store.setCountry({
    value: country,
    text: countries.find((c: Country) => c.value === country)?.text ?? ''
  })
  await store.fetchNews()
})
</script>

<template>
  <header>
    <div class="wrapper">
      <RouterLink to="/">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="400" />
      </RouterLink>
      <select v-model="countrySelected">
        <option
          v-for="country in countries"
          :key="country.value"
          :value="country.value.toLocaleLowerCase()"
        >
          {{ country.text }}
        </option>
      </select>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
select {
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  padding: 0.5rem;
  font-size: 1rem;
  margin-top: 1rem;
  width: 100%;
  max-width: 400px;
  background-color: var(--color-background);
  color: var(--color-text);
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
