<template>
    <h3>Home</h3>
    <RouterLink class="nav-link active" aria-current="page" :to="loginOrLogoutLink">
      {{ loginOrLogoutText }}
    </RouterLink>
    <div v-if="isLoggedIn">
      <div>{{ user.name }}</div>
      <div>上次登入時間:{{ user.loginTime }}</div>
    </div>
    
</template>
    
<script setup>
import { computed } from 'vue';

const props = defineProps({ isLoggedIn: Boolean,user: Object  });

const loginOrLogoutText = computed(() => props.isLoggedIn ? '登出' : '登入');
const loginOrLogoutLink = computed(() => props.isLoggedIn ? '/Employee/EmployeeLogout' : '/Employee/EmployeeLogin');
    
</script>
    
<style>
    
</style>