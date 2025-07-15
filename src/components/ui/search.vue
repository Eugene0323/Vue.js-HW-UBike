<script setup>
import { ref, onMounted } from 'vue';
import UbikeItem from './ubikeItem.vue';
import { UbikeInfoStore } from '@/stores/ubike_store';

const store = UbikeInfoStore();
const SearchInput = ref('');

const onSearch = () => {
  const content = SearchInput.value;

  if (content != '') {
    store.updateUbikeInfo(content);
    SearchInput.value = '';
  }
};

onMounted(() => {
  store.getUbikeInfo();
  store.getFavoriteList();
});
</script>

<template>
  <section class="container mx-auto">
    <h1 class="text-2xl">台北市UBIKE查詢</h1>
    <label
      for="my-drawer"
      class="absolute top-3 right-3 btn btn-warning drawer-button"
      >我的最愛</label
    >
    <div class="my-2">
      <input
        type="text"
        @keyup.enter="onSearch"
        v-model.trim="SearchInput"
        class="input"
      />
      <button @click="onSearch" class="btn">搜尋</button>
    </div>
    <div class="divider"></div>
    <section class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <ubikeItem
        :key="ubike.sno"
        :ubike="ubike"
        v-for="ubike in store.UbikeInfo"
      />
    </section>
  </section>

  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
    </div>
    <div class="drawer-side">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <!-- Sidebar content here -->

        <li v-for="info in store.FavoriteList" class="flex">
          <a>{{ info }}</a
          ><button @click="store.deleteFromFavorite(info)">del</button>
        </li>
      </ul>
    </div>
  </div>
</template>
