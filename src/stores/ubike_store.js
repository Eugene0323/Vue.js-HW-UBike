import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
//import { getToken } from '@/utils/token';

//axios.defaults.headers.common['Authorization'] = getToken();

const UbikeInfoStore = defineStore('UbikeStores', () => {
  const UbikeInfo = ref([]);
  const UbikeInfoALL = ref([]);
  const FavoriteList = ref([]);
  //const token = ref('');

  const toggleTodo = (id) => {
    const todo = todos.value.find((t) => t.id == id);

    if (todo.completed_at) {
      todo.completed_at = null;
    } else {
      todo.completed_at = new Date().toLocaleString();
    }

    axios.patch(`https://todoo.5xcamp.us/todos/${id}/toggle`);
  };

  const deleteTodo = (id) => {
    const idx = todos.value.findIndex((t) => t.id == id);
    todos.value.splice(idx, 1);
    axios.delete(`https://todoo.5xcamp.us/todos/${id}`);
  };

  const addTodo = async (content) => {
    try {
      const formData = {
        todo: {
          content: content,
        },
      };

      const uuid = crypto.randomUUID();

      todos.value.unshift({
        id: uuid,
        content: content,
        completed_at: null,
      });

      const { data } = await axios.post(
        'https://todoo.5xcamp.us/todos',
        formData
      );
      const todo = todos.value.find((t) => t.id == uuid);
      todo.id = data.id;
    } catch (err) {
      console.log(err);
    }
  };
  const addToFavorite = (area, ar) => {
    const keys = area + '-' + ar;
    const storage = localStorage.getItem('FavoriteList');
    const result = JSON.parse(storage) || [];
    const exists = result.some((item) => item === keys);
    if (!exists) {
      FavoriteList.value.unshift(keys);
      localStorage.setItem('FavoriteList', JSON.stringify(FavoriteList.value));
      console.log(keys);
    }
  };
  const deleteFromFavorite = (keys) => {
    const storage = localStorage.getItem('FavoriteList');
    const result = JSON.parse(storage) || [];

    FavoriteList.value = result.filter((item) => item != keys);
    localStorage.setItem('FavoriteList', JSON.stringify(FavoriteList.value));
    console.log('delete', keys);
  };
  const getFavoriteList = () => {
    const storage = localStorage.getItem('FavoriteList');

    if (storage != null) {
      const result = JSON.parse(storage);
      FavoriteList.value = result;
    }
  };
  const getUbikeInfo = async () => {
    const { data } = await axios.get(
      'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
    );
    UbikeInfo.value = data;
    UbikeInfoALL.value = data;
    console.log(data);
  };
  const updateUbikeInfo = async (sarea) => {
    UbikeInfo.value = UbikeInfoALL.value.filter((item) => item.sarea === sarea);

    const { data } = await axios.get(
      'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
    );
    UbikeInfo.value = data.filter((item) => item.sarea === sarea);
    UbikeInfoALL.value = data;
    //console.log(data);
  };

  const updateTodo = (id, content) => {
    const formData = {
      todo: {
        content,
      },
    };

    axios.put(`https://todoo.5xcamp.us/todos/${id}`, formData);
  };

  return {
    //token,
    UbikeInfo,
    FavoriteList,
    addToFavorite,
    deleteFromFavorite,
    getFavoriteList,
    getUbikeInfo,
    updateUbikeInfo,
  };
});

export { UbikeInfoStore };
