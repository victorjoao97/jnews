import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import NewsList from '../NewsList.vue'
import { setActivePinia, createPinia } from 'pinia'
import { useNewsStore } from '../../stores/news'

describe('NewsList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('renders properly', async () => {
    const store = useNewsStore()
    store.setNewsList([])
    const wrapper = mount(NewsList, { global: { plugins: [] }})
    expect(wrapper.text()).toContain('Carregando...')
  })
  it('renders properly', async () => {
    const store = useNewsStore()
    store.setNewsList([
      {
        title: 'title',
        description: 'description',
        urlToImage: 'urlToImage',
        url: 'url',
        publishedAt: 'publishedAt',
        content: 'content',
        author: 'author'
      }
    ])
    const wrapper = mount(NewsList, { global: { plugins: [] }})
    expect(wrapper.find('ul').exists()).toBeTruthy()
  })
})
