<script setup>
import { useTemplateRef, ref } from 'vue';
import { UbikeInfoStore } from '@/stores/ubike_store';

const store = UbikeInfoStore();
const editModal = useTemplateRef('edit-modal');
const content = ref('');

const props = defineProps({
  ubike: Object,
});
</script>

<template>
  <div class="select-none card bg-base-100 card-md shadow-sm">
    <div class="card-body">
      <div class="justify-end card-actions">
        <button
          @click="store.addToFavorite(ubike.sarea, ubike.ar)"
          class="absolute top-3 right-3 btn btn-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-[1.3em]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
        <h1 class="card-title">{{ ubike.sarea }} - {{ ubike.ar }}</h1>
      </div>

      <h2>可租借數量:{{ ubike.available_rent_bikes }}</h2>
      <h2>可歸還數量:{{ ubike.available_return_bikes }}</h2>
      <span>座標：({{ ubike.latitude }},{{ ubike.longitude }}) </span>
      <span>資料更新時間：{{ ubike.updateTime }}</span>
    </div>
  </div>
</template>
