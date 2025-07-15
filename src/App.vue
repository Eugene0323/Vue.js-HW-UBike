<script setup>
//import RegisterForm from './components/users/RegisterForm.vue';
//import LoginForm from './components/users/LoginForm.vue';
import search from './components/ui/search.vue';

//import { getToken } from '@/utils/token';

import { ref, onMounted } from 'vue';

const show = ref('login');

onMounted(() => {});
</script>

<template>
  <search />
  <!--<LoginForm
   v-if="show == 'login'"
    @go_register="show = 'register'"
    @login_success="show = 'todo'"
  />
  <RegisterForm v-if="show == 'register'" @go_login="show = 'login'" />
  -->
</template>
